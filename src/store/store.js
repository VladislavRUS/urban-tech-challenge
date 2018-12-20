import { types, flow } from 'mobx-state-tree';
import axios from 'axios';

export const API_HOST = 'http://192.168.0.189:5000';
const ATTACH_FILE = '/api/contracts/{contractId}/attachFile';
const GET_COMBINATIONS = '/api/combinations';
const GET_USERS = '/api/users';
const FINISH = '/api/contracts/{contractId}/finish';
const ATTACH = '/api/attach';
const DEMO_USER_ID = '1';

export const ATTACH_TYPES = {
  IMAGE: 'image',
  AUDIO: 'audio',
  COMMENT: 'comment'
};

const Attach = types.model({
  id: types.string,
  type: types.string,
  data: types.string,
  contractId: types.string
});

const Contract = types.model({
  id: types.string,
  number: types.string,
  customer: types.string,
  subject: types.string,
  cost: types.string,
  troubles: types.string,
  address: types.maybe(types.string),
  latitude: types.string,
  longitude: types.string,
  expirationDate: types.string,
  hide: types.maybe(types.boolean),
  isFinished: types.maybe(types.boolean),
  attaches: types.maybe(types.array(Attach))
});

const User = types.model({
  id: types.string,
  firstName: types.string,
  lastName: types.string,
  patronymic: types.string,
  avatar: types.string,
  latitude: types.number,
  longitude: types.number
});

const Store = types
  .model({
    currentContractId: types.maybe(types.string),
    user: types.maybe(User),
    contracts: types.maybe(types.array(Contract))
  })
  .views(self => ({
    get currentContract() {
      return self.contracts.find(
        contract => contract.id === self.currentContractId
      );
    },
    get comment() {
      if (self.currentContract) {
        const commentAttach = self.currentContract.attaches.find(
          attach => attach.type === ATTACH_TYPES.COMMENT
        );

        if (commentAttach) {
          return commentAttach.data;
        }
      }

      return '';
    },
    get attaches() {
      if (self.currentContract) {
        const attaches = self.currentContract.attaches;

        return attaches.filter(attach => attach.type !== ATTACH_TYPES.COMMENT);
      }

      return [];
    },
    get images() {
      return self.attaches.filter(attach => attach.type === ATTACH_TYPES.IMAGE);
    }
  }))
  .actions(self => ({
    setCurrentContractId(id) {
      self.currentContractId = id;
    },
    getUsers: flow(function*() {
      const url = API_HOST + GET_USERS;

      const { data } = yield axios.get(url);

      self.user = data.find(user => user.id === DEMO_USER_ID);
    }),
    getContracts: flow(function*() {
      const url = API_HOST + GET_COMBINATIONS;

      const response = yield axios.get(url);
      const combinations = response.data;

      if (!combinations) {
        return;
      }

      const userCombination = combinations.find(
        combination => combination.user.id === self.user.id
      );

      if (!userCombination) {
        return;
      }

      const contracts = userCombination.contracts.filter(
        contract => !contract.isFinished
      );

      Store.contracts = contracts.map(contract =>
        Contract.create({ ...contract, cost: contract.cost.toString() })
      );
    }),
    uploadImage: flow(function*({ uri }) {
      const url =
        API_HOST + ATTACH_FILE.replace('{contractId}', self.currentContract.id);

      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1];

      let formData = new FormData();
      formData.append('attach', {
        uri,
        name: `attach.${fileType}`,
        type: `image/${fileType}`
      });

      let options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      };

      yield fetch(url, options);
    }),
    saveComment: flow(function*(comment) {
      const url = API_HOST + ATTACH;

      const data = {
        contractId: self.currentContractId,
        data: comment,
        type: ATTACH_TYPES.COMMENT
      };

      yield axios.post(url, {
        ...data
      });

      yield self.getContracts();
    }),
    finish: flow(function*(contract, status) {
      const url = API_HOST + FINISH.replace('{contractId}', contract.id);

      const data = {
        status,
        userId: self.user.id
      };

      yield axios.post(url, {
        ...data
      });
    }),
    removePhoto: flow(function*(attach) {
      const url =
        API_HOST +
        ATTACH_FILE.replace('{contractId}', self.currentContract.id) +
        '/' +
        attach.id;

      yield axios.delete(url);
    })
  }))
  .create();

export default Store;
