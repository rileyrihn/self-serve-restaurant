<template>
  <v-card class="my-8 mx-auto" max-width="900">
    <v-app-bar flat color="rgba(0, 0, 0, 0)">
      <v-toolbar-title class="text-h4 pl-0"> Food Items </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
            align="right"
          >
            <v-icon left>mdi-plus</v-icon>
            New Food Item
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">
              {{ editing ? "Edit " : "Add " }} Food Item
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form" v-model="valid" v-on:submit.prevent>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      autofocus
                      v-model="itemToEdit.name"
                      label="Food Item Name"
                      :rules="[requiredRule]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="itemToEdit.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="itemToEdit.image"
                      label="Image"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="8">
                    <v-select
                      v-model="itemToEdit.type"
                      :items="foodTypes"
                      label="Type"
                      :rules="[requiredRule]"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="itemToEdit.price"
                      label="Price"
                      prefix="$"
                      :rules="priceRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-checkbox
                      v-model="itemToEdit.glutenFree"
                      label="Gluten Free"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-checkbox
                      v-model="itemToEdit.vegan"
                      label="Vegan"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="cancelAddEdit">
              Cancel
            </v-btn>
            <v-btn
              color="secondary"
              text
              @click="saveAddEdit"
              :disabled="!valid"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-card-subtitle>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-subtitle>
    <v-data-table
      :headers="headers"
      :items="foodItems"
      :search="search"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:top>
        <v-dialog v-model="deleteDialog" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="cancelDelete">Cancel</v-btn>
              <v-btn color="secondary" text @click="confirmDelete">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.image="{ item }">
        <div class="pa-1">
          <v-img
            :src="item.image"
            :alt="item.name"
            height="60px"
            width="60px"
          ></v-img>
        </div>
      </template>
      <template v-slot:item.price="{ item }"> ${{ item.price }} </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon
          small
          v-if="deletingItemId !== item.id"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
        <v-progress-circular
          v-else
          indeterminate
          color="red"
        ></v-progress-circular>
      </template>
    </v-data-table>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import FoodItem from "@/models/FoodItem";

@Component({
  components: {},
  computed: {
    ...mapState({
      foodItems: "foodItems",
    }),
  },
})
export default class Owner extends Vue {
  headers = [
    { text: "Image", value: "image" },
    {
      text: "Name",
      align: "start",
      sortable: false,
      value: "name",
    },
    { text: "Price", value: "price" },
    { text: "Actions", value: "actions", sortable: false },
  ];
  foodItems!: Array<FoodItem>;
  search = "";
  dialog = false;
  deleteDialog = false;
  itemToEdit = {} as FoodItem;
  indexToDelete = -1;
  editing = false;
  foodTypes = ["Breakfast", "Lunch", "Dinner"];
  requiredRule = (v: string): boolean | string => !!v || "Required.";
  currencyRegex =
    /(^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.[0-9][0-9])?$)/;
  priceRules = [
    (v: string): boolean | string =>
      this.currencyRegex.test(v) || "Invalid Price.",
    this.requiredRule,
    (v: string): boolean | string =>
      (parseFloat(v) > 0 && parseFloat(v) < 100) ||
      "Price must be between $0 and $100.",
  ];
  valid = false;
  deletingItemId = "";

  editItem(item: FoodItem): void {
    this.itemToEdit = Object.assign({}, item);
    this.editing = true;
    this.dialog = true;
  }

  saveAddEdit(): void {
    if (this.editing) {
      this.$store.dispatch("editFoodItem", this.itemToEdit);
    } else {
      this.$store.dispatch("addFoodItem", this.itemToEdit);
    }
    this.cancelAddEdit();
  }

  cancelAddEdit(): void {
    this.itemToEdit = {} as FoodItem;
    this.editing = false;
    this.dialog = false;
  }

  deleteItem(item: FoodItem): void {
    this.indexToDelete = this.foodItems.findIndex((val) => val.id === item.id);
    this.deleteDialog = true;
  }

  async confirmDelete(): Promise<void> {
    this.deleteDialog = false;
    try {
      this.deletingItemId = this.foodItems[this.indexToDelete].id;
      const index = this.indexToDelete;
      this.indexToDelete = -1;
      await this.$store.dispatch("deleteFoodItem", index);
      this.deletingItemId = "";
    } catch {
      alert("Something went wrong deleting that item, please try again.");
    }
  }

  cancelDelete(): void {
    this.indexToDelete = -1;
    this.deleteDialog = false;
  }
}
</script>
