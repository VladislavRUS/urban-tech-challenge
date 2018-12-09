import { types, flow } from 'mobx-state-tree';
import axios from 'axios';

const API_HOST = 'http://024f5f65.ngrok.io';
// const API_HOST = 'http://localhost:5000';
const UPLOAD_FILE = '/api/mobile/22/attaches';
const GET_CONTRACTS = '/api/users/{userId}/contracts';
const FINISH = '/api/contracts/finish';

export const ATTACH_TYPES = {
  IMAGE: 'image',
  AUDIO: 'audio'
};

const CheckObject = types.model({
  id: types.number,
  customer: types.string,
  address: types.string,
  expirationDate: types.string,
  subject: types.string
});

const Attach = types.model({
  id: types.number,
  type: types.string,
  url: types.string
});

const Contract = types.model({
  number: types.string,
  customer: types.string,
  subject: types.string,
  cost: types.string,
  troubles: types.string,
  address: types.maybe(types.string),
  latitude: types.string,
  longitude: types.string,
  expirationDate: types.string
});

const Store = types
  .model({
    currentObjectId: types.maybe(types.number),
    objects: types.maybe(types.array(CheckObject)),
    attaches: types.maybe(types.array(Attach)),
    comment: types.maybe(types.string),
    contracts: types.maybe(types.array(Contract)),
    userId: types.maybe(types.string)
  })
  .actions(self => ({
    setCurrentObjectId(id) {
      self.currentObjectId = id;
    },
    saveComment(comment) {
      self.comment = comment;
    },
    getContracts: flow(function*() {
      const url = API_HOST + GET_CONTRACTS.replace('{userId}', self.userId);

      const response = yield axios.get(url);
      const contracts = response.data;

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
    finish: flow(function*(contract, status) {
      const url = API_HOST + FINISH;

      const data = {
        contract,
        status
      };

      yield axios.post(url, {
        data
      });
    })
  }))
  .create({
    objects: [
      {
        id: 1,
        customer: 'ГУП «Я взял твою бу»',
        expirationDate: '02.02.2019',
        address: 'ул. Большая Акиманка, 19',
        subject:
          'Нужно проверить что-то там где-то там.\n' +
          'Этот текст может занимать сколько угодно\n' +
          'места, поместится всё!'
      }
    ],
    attaches: [
      {
        id: 1,
        type: ATTACH_TYPES.IMAGE,
        url:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kitten_in_Rizal_Park%2C_Manila.jpg/230px-Kitten_in_Rizal_Park%2C_Manila.jpg'
      }
    ],
    comment: 'Это мой супер коммент',
    userId: '123qwe'
  });

export default Store;
