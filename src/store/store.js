import { types } from 'mobx-state-tree';

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

export const ATTACH_TYPES = {
  IMAGE: 'image',
  AUDIO: 'audio'
};

const Store = types
  .model({
    currentObjectId: types.maybe(types.number),
    objects: types.maybe(types.array(CheckObject)),
    attaches: types.maybe(types.array(Attach)),
    comment: types.maybe(types.string)
  })
  .actions(self => ({
    setCurrentObjectId(id) {
      self.currentObjectId = id;
    },
    saveComment(comment) {
      self.comment = comment;
    }
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
    comment: 'Это мой супер коммент'
  });

export default Store;
