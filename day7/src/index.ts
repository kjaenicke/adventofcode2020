import { input } from "./input";

function parse() {
  return input.trim().split("\n");
}

class Luggage {
  bags_lookup: Record<string, Bag>;
  rules: Record<string, Bag[]>;

  constructor(raw_rules: string[]) {
    this.bags_lookup = this.parseToBagsLookup(raw_rules);
    this.rules = this.parseToRulesLookup(raw_rules);
  }

  parseToBagsLookup(raw_rules: string[]) {
    let bags_lookup: Record<string, Bag> = {};

    for (let rule of raw_rules) {
      let [parent, child] = rule.split(" bags contain ");

      if (!bags_lookup[parent]) {
        bags_lookup[parent] = new Bag({ name: parent });
      }

      if (child.includes("no other")) {
        continue;
      }

      const children = child.split(", ");

      for (let child of children) {
        const [, countRaw, name]: any = /(\d+) (\w+ \w+) bag/.exec(child);
        parseInt(countRaw, 10);

        let bag = bags_lookup[name];
        if (!bag) {
          bag = new Bag({ name });
          bags_lookup[name] = bag;
        }
        bag.addParent(bags_lookup[parent]);
      }
    }

    return bags_lookup;
  }

  parseToRulesLookup(raw_rules: string[]) {
    let bags_lookup: Record<string, Bag[]> = {};

    for (let rule of raw_rules) {
      let [parent, child] = rule.split(" bags contain ");

      if (!bags_lookup[parent]) {
        bags_lookup[parent] = [];
      }

      if (child.includes("no other")) {
        continue;
      }

      const children = child.split(", ");

      for (let child of children) {
        const [, countRaw, name]: any = /(\d+) (\w+ \w+) bag/.exec(child);
        const count = parseInt(countRaw, 10);
        bags_lookup[parent].push(new Bag({ name, count }));
      }
    }

    return bags_lookup;
  }

  countChildrenInside(bag_name: string) {
    if (!this.rules[bag_name]) {
      throw new Error(`Invalid bag name: "${bag_name}"`);
    }

    let rules = this.rules[bag_name];

    if (!rules.length) {
      return 0;
    }

    let children_count = 0;

    for (let bag of rules) {
      let { name, count } = bag;

      children_count += count;
      children_count += count * this.countChildrenInside(name);
    }

    return children_count;
  }
}

class Bag {
  name: string;
  count: number;
  parent_bags: Bag[];

  constructor({ name, count = 0 }: { name: string; count?: number }) {
    this.name = name;
    this.count = count;
    this.parent_bags = [];
  }

  addParent(parent_bag: Bag) {
    this.parent_bags.push(parent_bag);
  }

  countUniqueParents() {
    let lookup = this._getUniqueAncestorsLookup({});
    return Object.keys(lookup).length;
  }

  _getUniqueAncestorsLookup(lookup: Record<string, Bag>) {
    for (let parent of this.parent_bags) {
      lookup[parent.name] = parent;

      if (parent.parent_bags.length) {
        parent._getUniqueAncestorsLookup(lookup);
      }
    }

    return lookup;
  }
}

let luggage = new Luggage(parse());
let shiny_gold = luggage.bags_lookup["shiny gold"];
console.log("Part One: ", shiny_gold.countUniqueParents());

let shiny_child_count = luggage.countChildrenInside("shiny gold");
console.log("Part Two: ", shiny_child_count);
