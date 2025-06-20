import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";

describe("GildedTrosTest", () => {
	describe("Current behavior of the items", () => {
		it("B-DAWG Keychain should never decrease in quality or SellIn", () => {
			const items: Item[] = [new Item("B-DAWG Keychain", 0, 80)];
			const app: GildedTros = new GildedTros(items);

			app.updateQuality();

			expect(items[0].sellIn).toBe(0);
			expect(items[0].quality).toBe(80);
		});

		it("Normal item should decrease by 1 before sellIn and sellIn should decrease by 1 per day", () => {
			const items: Item[] = [
				new Item("Ring of Cleansening Code", 10, 20),
			];
			const app: GildedTros = new GildedTros(items);

			app.updateQuality();

			expect(items[0].sellIn).toBe(9);
			expect(items[0].quality).toBe(19);
		});

		it("Normal item should decrease by 2 after sellIn and sellIn should decrease by 1 per day", () => {
			const items: Item[] = [new Item("Ring of Cleansening Code", 0, 20)];
			const app: GildedTros = new GildedTros(items);

			app.updateQuality();

			expect(items[0].sellIn).toBe(-1);
			expect(items[0].quality).toBe(18);
		});

		it("Good wine item should increase by 1 before sellIn and sellIn should decrease by 1 per day", () => {
			const items: Item[] = [new Item("Good Wine", 2, 0)];
			const app: GildedTros = new GildedTros(items);

			app.updateQuality();

			expect(items[0].sellIn).toBe(1);
			expect(items[0].quality).toBe(1);
		});

		it("Good wine item should increase by 2 after sellIn and sellIn should decrease by 1 per day", () => {
			const items: Item[] = [new Item("Good Wine", 0, 0)];
			const app: GildedTros = new GildedTros(items);

			app.updateQuality();

			expect(items[0].sellIn).toBe(-1);
			expect(items[0].quality).toBe(2);
		});

		it("Backstage passes item should increase by 1, if more than 10 days before sellIn and sellIn should decrease by 1 per day", () => {
			const items: Item[] = [
				new Item("Backstage passes for Re:Factor", 15, 20),
			];
			const app: GildedTros = new GildedTros(items);

			app.updateQuality();

			expect(items[0].sellIn).toBe(14);
			expect(items[0].quality).toBe(21);
		});

		it("Backstage passes item should increase by 2, if between 10 - 6 days before sellIn and sellIn should decrease by 1 per day", () => {
			const items: Item[] = [
				new Item("Backstage passes for Re:Factor", 10, 20),
			];
			const app: GildedTros = new GildedTros(items);

			app.updateQuality();

			expect(items[0].sellIn).toBe(9);
			expect(items[0].quality).toBe(22);
		});

		it("Backstage passes item should increase by 3, if between 5 - 0 days before sellIn and sellIn should decrease by 1 per day", () => {
			const items: Item[] = [
				new Item("Backstage passes for Re:Factor", 5, 20),
			];
			const app: GildedTros = new GildedTros(items);

			app.updateQuality();

			expect(items[0].sellIn).toBe(4);
			expect(items[0].quality).toBe(23);
		});

		it("Backstage passes item should go to 0 after sellIn and sellIn should decrease by 1 per day", () => {
			const items: Item[] = [
				new Item("Backstage passes for Re:Factor", 0, 20),
			];
			const app: GildedTros = new GildedTros(items);

			app.updateQuality();

			expect(items[0].sellIn).toBe(-1);
			expect(items[0].quality).toBe(0);
		});
	});

	describe("Edge cases", () => {
		it("The quality of normal items should never go below 0", () => {
			const items: Item[] = [new Item("Elixir of the SOLID", 5, 0)];
			const app: GildedTros = new GildedTros(items);

			app.updateQuality();

			expect(items[0].quality).toBe(0);
		});

		it("The quality of Good wine should never go above 50", () => {
			const items: Item[] = [new Item("Good Wine", 2, 50)];
			const app: GildedTros = new GildedTros(items);

			app.updateQuality();

			expect(items[0].quality).toBe(50);
		});

		it("The quality of Backstage passes should never go above 50", () => {
			const items: Item[] = [
				new Item("Backstage passes for HAXX", 5, 49),
			];
			const app: GildedTros = new GildedTros(items);

			app.updateQuality();

			expect(items[0].quality).toBe(50);
		});
	});
});
