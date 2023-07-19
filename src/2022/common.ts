export class Elf {
  #backpack: number[] = [];
  #calories: number | undefined = undefined;

  addItemToBackpack(item: number) {
    this.#backpack.push(item);
  }

  getCalories() {
    if (this.#calories) return this.#calories;
    this.#calories = this.#backpack.reduce((sum, curr) => sum + curr, 0);
    return this.#calories;
  }
}
