<template>
  <div class="customer">
    <v-btn class="cart-btn" fab large color="secondary" @click="drawer = true">
      <v-icon dark> mdi-cart </v-icon>
    </v-btn>
    <v-container class="pt-6">
      <v-row justify="center">
        <v-col cols="12" md="9">
          <v-expansion-panels>
            <v-expansion-panel key="1">
              <v-expansion-panel-header>
                Filter, Sort and Search
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="align-center">
                    <v-col cols="12" md="7">
                      <v-chip-group
                        v-model="activeFilters"
                        multiple
                        active-class="primary--text"
                      >
                        <v-chip
                          v-for="filter in filters"
                          :key="filter"
                          :value="filter"
                        >
                          {{ filter }}
                        </v-chip>
                      </v-chip-group>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-btn-toggle
                        v-model="sort"
                        active-class="primary--text"
                        tile
                        group
                      >
                        <v-btn value="highLow">
                          <span class="text-body-2">Price: High to Low</span>
                        </v-btn>
                        <v-btn value="lowHigh">
                          <span class="text-body-2">Price: Low to High</span>
                        </v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row class="justify-center mt-3">
        <template v-for="item in foodItemsToDisplay">
          <v-card class="ma-3" :key="item.id">
            <v-card-title v-html="searchedValue(item.name)"></v-card-title>
            <v-img :src="item.image" height="160px"></v-img>
            <v-card-subtitle>
              {{ item.type }}
              <template v-if="item.vegan">
                <v-icon>mdi-circle-small</v-icon>
                Vegan
              </template>
              <template v-if="item.glutenFree">
                <v-icon>mdi-circle-small</v-icon>
                Gluten Free
              </template>
            </v-card-subtitle>
            <v-card-text
              v-if="item.description.length < 49"
              class="pb-0"
              v-html="searchedValue(item.description)"
            >
            </v-card-text>
            <v-tooltip v-else bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-card-text
                  v-bind="attrs"
                  v-on="on"
                  class="py-0"
                  v-html="
                    searchedValue(
                      $options.filters.filterDescriptionText(item.description)
                    )
                  "
                >
                </v-card-text>
              </template>
              <span>{{ item.description }}</span>
            </v-tooltip>
            <v-divider class="mt-4"></v-divider>
            <v-card-actions class="pa-3">
              <span>${{ item.price }}</span>
              <v-spacer></v-spacer>
              <v-btn @click="addToCart(item)">
                <v-icon left>mdi-plus</v-icon>
                Add To Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-row>
    </v-container>
    <v-navigation-drawer v-model="drawer" width="300" absolute right temporary>
      <div class="text-h4 pa-4 text-center">Order Details</div>
      <v-divider></v-divider>
      <v-list three-line>
        <template v-for="(item, index) in cartItems">
          <v-list-item :key="item.id">
            <v-list-item-avatar tile>
              <v-img :src="item.image"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.name + " (" + item.count + ")" }}</v-list-item-title
              >
              <v-list-item-subtitle>${{ item.price }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn @click="deleteItemFromCart(item)" icon>
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="index"></v-divider>
        </template>
      </v-list>
      <div class="text-h4 pa-4 text-center">Total: {{ cartTotal }}</div>
    </v-navigation-drawer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import FoodItem from "@/models/FoodItem";
import CartItem from "@/models/CartItem";
import _ from "lodash";

interface FoodCartItem extends FoodItem {
  count: number;
}

@Component({
  components: {},
  filters: {
    filterDescriptionText(value: string) {
      return value.slice(0, 49) + "...";
    },
  },
  computed: {
    ...mapState({
      foodItems: "foodItems",
      cart: "cart",
    }),
  },
})
export default class Customer extends Vue {
  drawer = false;
  foodItems!: Array<FoodItem>;
  cart!: Array<CartItem>;
  cartTotal = "0.10";
  filters = ["Gluten Free", "Vegan", "Breakfast", "Lunch", "Dinner"];
  activeFilters = ["Breakfast", "Lunch", "Dinner"];
  sort = "";
  search = "";

  get cartItems(): Array<FoodCartItem> {
    const dollars = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const cartItems: Array<FoodCartItem> = [];
    let total = 0.0;
    this.cart.forEach((val) => {
      const temp: FoodCartItem | undefined = this.foodItems.find(
        (x) => x.id === val.foodId
      ) as FoodCartItem;
      if (temp) {
        temp.count = val.count;
        cartItems.push(temp);
        total = total + parseFloat(temp.price);
      }
    });
    this.cartTotal = dollars.format(total);
    return cartItems;
  }

  get foodItemsToDisplay(): Array<FoodItem> {
    let tempFoodItems: Array<FoodItem> = _.cloneDeep(this.foodItems);
    if (this.activeFilters.includes("Gluten Free")) {
      tempFoodItems = tempFoodItems.filter((item) => item.glutenFree === true);
    }
    if (this.activeFilters.includes("Vegan")) {
      tempFoodItems = tempFoodItems.filter((item) => item.vegan === true);
    }
    tempFoodItems = this.checkTypeFilters(tempFoodItems);

    tempFoodItems = this.applySearchFilter(tempFoodItems);

    if (this.sort === "highLow") {
      tempFoodItems.sort((a: FoodItem, b: FoodItem) => {
        return parseFloat(b.price) - parseFloat(a.price);
      });
    } else if (this.sort === "lowHigh") {
      tempFoodItems.sort((a: FoodItem, b: FoodItem) => {
        return parseFloat(a.price) - parseFloat(b.price);
      });
    }

    return tempFoodItems;
  }

  private checkTypeFilters(tempFoodItems: Array<FoodItem>): Array<FoodItem> {
    if (
      this.activeFilters.includes("Breakfast") ||
      this.activeFilters.includes("Lunch") ||
      this.activeFilters.includes("Dinner")
    ) {
      let breakfast: Array<FoodItem> = [];
      let lunch: Array<FoodItem> = [];
      let dinner: Array<FoodItem> = [];

      if (this.activeFilters.includes("Breakfast")) {
        breakfast = tempFoodItems.filter((item) => item.type === "Breakfast");
      }
      if (this.activeFilters.includes("Lunch")) {
        lunch = tempFoodItems.filter((item) => item.type === "Lunch");
      }
      if (this.activeFilters.includes("Dinner")) {
        dinner = tempFoodItems.filter((item) => item.type === "Dinner");
      }
      return [...breakfast, ...lunch, ...dinner];
    }
    return tempFoodItems;
  }

  private applySearchFilter(tempFoodItems: Array<FoodItem>): Array<FoodItem> {
    const regex = new RegExp(this.search, "ig");
    return tempFoodItems.filter(
      (item) =>
        item.name.search(regex) !== -1 || item.description.search(regex) !== -1
    );
  }

  searchedValue(value: string): string {
    if (this.search === "") return value;
    const regex = new RegExp(this.search, "ig");
    const foundValue = value.search(regex) !== -1;
    return !foundValue
      ? value
      : value.replace(regex, '<span class="primary--text">$&</span>');
  }

  addToCart(item: FoodItem): void {
    this.$store.dispatch("addToCart", item.id);
  }

  deleteItemFromCart(item: FoodItem): void {
    this.$store.dispatch("deleteFromCart", item.id);
  }
}
</script>
<style lang="scss" scoped>
.container {
  max-width: 1264px;
}
.v-card {
  width: 290px;
}
.v-card__text {
  height: 44px;
}
.highlight {
  color: red;
}
.cart-btn {
  position: fixed;
  right: 10px;
  top: 80px;
}
</style>
