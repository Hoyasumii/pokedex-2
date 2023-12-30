// JS Imports
import unslugify from "../unslugify";

export default class Pokemon {
    constructor(data) {
        this.name = unslugify(data.name);
        this.id = data.id;
        this.height = data.height / 10;
        this.weight = data.weight / 10;
        this.sprite = data.sprites.other['official-artwork'].front_default;
        this.baseExperience = data.base_experience == null ? "0" : `${ data.base_experience }`;
        this.types = data.types.map((type) => type.type.name);
        this.moves = data.moves.map((move) => move.move.name);
        this.stats = {};
        this.totalStats = 0;
        data.stats.forEach((stat) => {
            this.stats[stat.stat.name] = stat.base_stat;
            this.totalStats += stat.base_stat;
        });
    }
}