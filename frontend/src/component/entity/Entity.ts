interface EntityState {
  state: any;
  history: any[];
}

class Entity {
  state: EntityState;

  constructor(json: any) {
    this.state = {
      state: json,
      history: [],
    };
  }

  // Add methods to modify state and history as per your requirements
}

export default Entity;