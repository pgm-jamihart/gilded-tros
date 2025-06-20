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

    /**
     * Quality + SellIn managment 
     */
	private increaseQuality(item: Item): void {
		item.quality = item.quality + 1;

		if (item.quality > 50) {
			item.quality = 50;
		}
	}

	private decreaseQuality(item: Item): void {
		item.quality = item.quality - 1;

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
     * Update item Quality 
     */
	public updateQuality(): void {
		for (let i = 0; i < this.items.length; i++) {
			/**
			 * NOT 'Good Wine' or 'Backstage passes'
			 * -> Q: -1
			 */
			if (
				!this.isGoodWine(this.items[i]) &&
				!this.isBackstagePass(this.items[i])
			) {
				/**
				 * Q is greater than 0
				 * Not legendary
				 * -> Q: -1
				 */
				if (!this.isLegendaryItem(this.items[i])) {
					this.decreaseQuality(this.items[i]);
				}
				/**
				 * Q is less than 50
				 * item is 'Good Wine' or 'Backstage passes'
				 * -> Q: +1
				 */
			} else {
				this.increaseQuality(this.items[i]);

				/**
				 * item is 'Backstage passes'
				 */
				if (this.isBackstagePass(this.items[i])) {
					/**
					 * SellIn less than 11 + Q less than 50
					 * -> Q: +1 (= becomes 2)
					 */
					if (this.items[i].sellIn < 11) {
						this.increaseQuality(this.items[i]);
					}

					/**
					 * SellIn less than 6 + Q less than 50
					 * -> Q: +1 (= becomes 3)
					 */
					if (this.items[i].sellIn < 6) {
						this.increaseQuality(this.items[i]);
					}
				}
			}

			/**
			 * If not legendary item -> Sellin: -1
			 */
			this.decreaseSellIn(this.items[i]);

			/**
			 * Sellin overdue
			 */
			if (this.items[i].sellIn < 0) {
				/**
				 * If item is normal and Q is more than 0
				 * -> Q: -1 (= becomes -2)
				 */
				if (!this.isGoodWine(this.items[i])) {
					if (!this.isBackstagePass(this.items[i])) {
						if (!this.isLegendaryItem(this.items[i])) {
							this.decreaseQuality(this.items[i]);
						}
					} else {
						/**
						 * Item is 'Backstage passes'
						 * -> Sellin overdue -> Q = 0
						 */
						this.resetQuality(this.items[i]);
					}
				} else {
					/**
					 * Item is 'Good Wine' and Q less than 50
					 * Q: +1 (= becomes +2)
					 */
					this.increaseQuality(this.items[i]);
				}
			}
		}
	}
}
