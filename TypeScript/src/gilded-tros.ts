import { Item } from "./item";

export class GildedTros {
	constructor(public items: Array<Item>) {}

	/**
	 * Item type detection
	 */
	private isLegendaryItem(item: Item): boolean {
		return item.name === "B-DAWG Keychain";
	}

	private isGoodWine(item: Item): boolean {
		return item.name === "Good Wine";
	}

	private isBackstagePass(item: Item): boolean {
		return (
			item.name === "Backstage passes for Re:Factor" ||
			item.name === "Backstage passes for HAXX"
		);
	}

	private isSmellyItem(item: Item): boolean {
		return (
			item.name === "Duplicate Code" ||
			item.name === "Long Methods" ||
			item.name === "Ugly Variable Names"
		);
	}

	private isNormalItem(item: Item): boolean {
		return (
			!this.isLegendaryItem(item) &&
			!this.isGoodWine(item) &&
			!this.isBackstagePass(item) &&
			!this.isSmellyItem(item)
		);
	}

	/**
	 * Quality + SellIn managment
	 */
	private increaseQuality(item: Item): void {
		item.quality = item.quality + 1;

		if (item.quality > 50) {
			item.quality = 50;
		}
	}

	private decreaseQuality(item: Item, amount: number = 1): void {
		item.quality = item.quality - amount;

		if (item.quality < 0) {
			item.quality = 0;
		}
	}

	private decreaseSellIn(item: Item): void {
		if (!this.isLegendaryItem(item)) {
			item.sellIn = item.sellIn - 1;
		}
	}

	private resetQuality(item: Item): void {
		item.quality = item.quality - item.quality;
	}

	/**
	 * Quality update logic per type
	 */
	private updateNormalItem(item: Item): void {
		/**
		 * Normal item
		 * -> Q: -1
		 * if sellIn < 0 -> Q: -2
		 */

		this.decreaseQuality(item);

		if (item.sellIn < 0) {
			this.decreaseQuality(item);
		}
	}

	private updateGoodWine(item: Item): void {
		/**
		 * Good wine
		 * -> Q: +1
		 * if sellIn < 0 -> Q: +2
		 */
		this.increaseQuality(item);

		if (item.sellIn < 0) {
			this.increaseQuality(item);
		}
	}

	private updateBackstagePass(item: Item): void {
		/**
		 * Backstage passes
		 * -> Q: +1
		 *
		 * if sellIn < 11 -> Q: +2
		 * if sellIn < 6 -> Q: +3
		 * if sellIn < 0 -> Q = 0
		 */
		this.increaseQuality(item);

		if (item.sellIn < 11) {
			this.increaseQuality(item);
		}

		if (item.sellIn < 6) {
			this.increaseQuality(item);
		}

		if (item.sellIn < 0) {
			this.resetQuality(item);
		}
	}

	private updateSmellyItem(item: Item): void {
		/**
		 * Smelly item
		 * -> Q: -2
		 * if sellIn < 0 -> Q: -4
		 */
		this.decreaseQuality(item, 2);

		if (item.sellIn < 0) {
			this.decreaseQuality(item, 2);
		}
	}

	/**
	 * Update item Quality
	 */
	public updateQuality(): void {
		for (let i = 0; i < this.items.length; i++) {
			/**
			 * If not legendary item -> Sellin: -1
			 */
			this.decreaseSellIn(this.items[i]);

			if (this.isNormalItem(this.items[i])) {
				this.updateNormalItem(this.items[i]);
			} else if (this.isGoodWine(this.items[i])) {
				this.updateGoodWine(this.items[i]);
			} else if (this.isBackstagePass(this.items[i])) {
				this.updateBackstagePass(this.items[i]);
			} else if (this.isSmellyItem(this.items[i])) {
				this.updateSmellyItem(this.items[i]);
			}
		}
	}
}
