import { Item } from "./item";

export class GildedTros {
	constructor(public items: Array<Item>) {}

	public updateQuality(): void {
		for (let i = 0; i < this.items.length; i++) {
			/**
			 * NOT 'Good Wine' or 'Backstage passes'
			 * -> Q: -1
			 */
			if (
				this.items[i].name != "Good Wine" &&
				this.items[i].name != "Backstage passes for Re:Factor" &&
				this.items[i].name != "Backstage passes for HAXX"
			) {
				/**
				 * Q is greater than 0
				 * Not legendary
				 * -> Q: -1
				 */
				if (this.items[i].quality > 0) {
					if (this.items[i].name != "B-DAWG Keychain") {
						this.items[i].quality = this.items[i].quality - 1;
					}
				}
				/**
				 * Q is less than 50
				 * item is 'Good Wine' or 'Backstage passes'
				 * -> Q: +1
				 */
			} else {
				if (this.items[i].quality < 50) {
					this.items[i].quality = this.items[i].quality + 1;

					/**
					 * item is 'Backstage passes'
					 */
					if (
						this.items[i].name == "Backstage passes for Re:Factor"
					) {
						/**
						 * SellIn less than 11 + Q less than 50
						 * -> Q: +1 (= becomes 2)
						 */
						if (this.items[i].sellIn < 11) {
							if (this.items[i].quality < 50) {
								this.items[i].quality =
									this.items[i].quality + 1;
							}
						}

						/**
						 * SellIn less than 6 + Q less than 50
						 * -> Q: +1 (= becomes 3)
						 */
						if (this.items[i].sellIn < 6) {
							if (this.items[i].quality < 50) {
								this.items[i].quality =
									this.items[i].quality + 1;
							}
						}
					}
				}
			}

			/**
			 * If not legendary item -> Sellin: -1
			 */
			if (this.items[i].name != "B-DAWG Keychain") {
				this.items[i].sellIn = this.items[i].sellIn - 1;
			}

			/**
			 * Sellin overdue
			 */
			if (this.items[i].sellIn < 0) {
				/**
				 * If item is normal and Q is more than 0
				 * -> Q: -1 (= becomes -2)
				 */
				if (this.items[i].name != "Good Wine") {
					if (
						this.items[i].name !=
							"Backstage passes for Re:Factor" &&
						this.items[i].name != "Backstage passes for HAXX"
					) {
						if (this.items[i].quality > 0) {
							if (this.items[i].name != "B-DAWG Keychain") {
								this.items[i].quality =
									this.items[i].quality - 1;
							}
						}
					} else {
						/**
						 * Item is 'Backstage passes'
						 * -> Sellin overdue -> Q = 0
						 */
						this.items[i].quality =
							this.items[i].quality - this.items[i].quality;
					}
				} else {
					/**
					 * Item is 'Good Wine' and Q less than 50
					 * Q: +1 (= becomes +2)
					 */
					if (this.items[i].quality < 50) {
						this.items[i].quality = this.items[i].quality + 1;
					}
				}
			}
		}
	}
}
