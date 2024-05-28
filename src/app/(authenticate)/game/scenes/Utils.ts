export default class MyUltils {

  constructor() {

  }

  public static example_init_stone_data() {
    return JSON.stringify([{
      'type': 'red',
      'level': 1,
      'value': 10,
    }, {
      'type': 'red',
      'level': 2,
      'value': 10,
    }, {
      'type': 'red',
      'level': 3,
      'value': 10,
    }, {
      'type': 'yellow',
      'level': 1,
      'value': 20,
    }, {
      'type': 'yellow',
      'level': 2,
      'value': 20,
    }, {
      'type': 'yellow',
      'level': 3,
      'value': 20,
    }, {
      'type': 'green',
      'level': 1,
      'value': 30,
    }, {
      'type': 'green',
      'level': 2,
      'value': 30,
    }, {
      'type': 'green',
      'level': 3,
      'value': 30,
    }]);
  }
}