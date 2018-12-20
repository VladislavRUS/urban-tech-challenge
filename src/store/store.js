import { types, flow } from 'mobx-state-tree';
import axios from 'axios';

const API_HOST = 'http://192.168.0.189:5000';
// const API_HOST = 'http://localhost:5000';
const UPLOAD_FILE = '/api/mobile/22/attaches';
const GET_COMBINATIONS = '/api/combinations';
const FINISH = '/api/contracts/{contractId}/finish';
const ATTACH = '/api/attach';

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

const Store = types
  .model({
    currentObjectId: types.maybe(types.string),
    contracts: types.maybe(types.array(Contract)),
    userId: types.maybe(types.string)
  })
  .actions(self => ({
    setCurrentObjectId(id) {
      self.currentObjectId = id;
    },
    getContracts: flow(function*() {
      const url = API_HOST + GET_COMBINATIONS;

      const response = yield axios.get(url);
      const combinations = response.data;

      if (!combinations) {
        return;
      }

      const userCombination = combinations.find(
        combination => combination.user.id === self.userId
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
      const url = API_HOST + UPLOAD_FILE;

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
        contractId: self.currentObjectId,
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
        userId: self.userId
      };

      yield axios.post(url, {
        ...data
      });
    })
  }))
  .views(self => ({
    get currentObject() {
      return self.contracts.find(
        contract => contract.id === self.currentObjectId
      );
    },
    get comment() {
      if (self.currentObject) {
        const commentAttach = self.currentObject.attaches.find(
          attach => attach.type === ATTACH_TYPES.COMMENT
        );

        if (commentAttach) {
          return commentAttach.data;
        }
      }

      return '';
    },
    get attaches() {
      if (self.currentObject) {
        const attaches = self.currentObject.attaches;

        return attaches.filter(attach => attach.type !== ATTACH_TYPES.COMMENT);
      }

      return [];
    }
  }))
  .create({
    userId: '1'
  });

export default Store;
