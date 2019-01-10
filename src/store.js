import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    products: [],
    coupons: [],
    pagination: {},
    product: {},
    carts: {},
    orders: {},
    order: {},
    messages: [],
    category: "",
    signin: false,
    isLoading: false
  },
  mutations: {
    SIGNIN(state, signin) {
      state.signin = signin;
    },
    LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    PAGINATION(state, pagination) {
      state.pagination = pagination;
    },
    PRODUCT(state, product) {
      state.product = product;
    },
    CARTS(state, carts) {
      state.carts = carts;
    },
    COUPONS(state, coupons) {
      state.coupons = coupons;
    },
    ORDERS(state, orders) {
      state.orders = orders;
    },
    ORDER(state, order) {
      state.order = order;
    },
    MESSAGES(state, message) {
      state.messages.push(message);
    },
    REMOVEMESSAGE(state, num) {
      state.messages.splice(num, 1);
    },
    PRODUCTS(state, products) {
      state.products = products;
    },
    CATEGORY(state, category) {
      state.category = category;
    }
  },
  actions: {
    getProducts(context) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/admin/products/all`;
      context.commit("LOADING", true);
      axios.get(api).then(res => {
        context.commit("PRODUCTS", res.data.products);
        context.commit("LOADING", false);
      });
    },
    getCoupons(context, page) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/admin/coupons?page=${page}`;
      context.commit("LOADING", true);
      axios.get(api).then(res => {
        context.commit("COUPONS", res.data.coupons);
        context.commit("PAGINATION", res.data.pagination);
        context.commit("LOADING", false);
      });
    },
    addCouponCode(context, coupon) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/coupon`;
      context.commit("LOADING", true);
      axios.post(api, { data: coupon }).then(res => {
        if (res.data.success) {
          context.dispatch("getCart");
          context.commit("LOADING", false);
          context.dispatch("alertMessage", res);
        } else {
          context.commit("LOADING", false);
          context.dispatch("alertMessage", res);
        }
      });
    },
    alertMessage(context, res) {
      const timestamp = Math.floor(new Date() / 1000);
      let status = "success";
      if (!res.data.success) { status = "danger" };
      let message = {
        message: res.data.message,
        status,
        timestamp
      };
      context.commit("MESSAGES", message);
      context.dispatch("removeMessageWithTiming", timestamp);
      
    },
    removeMessageWithTiming(context, timestamp) {
      setTimeout(() => {
        context.state.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            context.commit("REMOVEMESSAGE", i);
          }
        });
      }, 3000);
    },
    getShoppingProducts(context) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/products/all`;
      context.commit("LOADING", true);
      axios.get(api).then(res => {
        context.commit("PRODUCTS", res.data.products);
        context.commit("LOADING", false);
      });
    },
    getProduct(context, id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/product/${id}`;
      context.commit("LOADING", true);
      axios.get(api).then(res => {
        context.commit("PRODUCT", res.data.product);
        context.commit("LOADING", false);
      });
    },
    addtoCart(context, cart) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart`;
      context.commit("LOADING", true);
      axios.post(api, { data: cart }).then(res => {
        if (res.data.success) {
          context.dispatch("getCart");
          context.commit("LOADING", false);
          context.dispatch("alertMessage", res);
        } else {
          context.commit("LOADING", false);
          context.dispatch("alertMessage", res);
        }
      });
    },
    getCart(context) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart`;
      context.commit("LOADING", true);
      axios.get(api).then(res => {
        context.commit("CARTS", res.data.data);
        context.commit("LOADING", false);
      });
    },
    removeCartItem(context, id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart/${id}`;
      context.commit("LOADING", true);
      axios.delete(api).then(res => {
        if (res.data.success) {
          context.dispatch("getCart");
          context.commit("LOADING", false);
          context.dispatch("alertMessage", res);
        } else {
          context.commit("LOADING", false);
          context.dispatch("alertMessage", res);
        }
      });
    },
    getOrders(context, page) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/orders?page=${page}`;
      context.commit("LOADING", true);
      axios.get(api).then(res => {
        context.commit("ORDERS", res.data.orders);
        context.commit("PAGINATION", res.data.pagination);
        context.commit("LOADING", false);
      });
    },
    getOrder(context, id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/order/${id}`;
      context.commit("LOADING", true);
      axios.get(api).then(res => {
        context.commit("ORDER", res.data.order);
        context.commit("LOADING", false);
      });
    },
    payOrder(context, id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/pay/${id}`;
      context.commit("LOADING", true);
      axios.post(api).then(res => {
        if (res.data.success) {
          context.dispatch("getOrder", id);
          context.commit("LOADING", false);
          context.dispatch("alertMessage", res);
        } else {
          context.commit("LOADING", false);
          context.dispatch("alertMessage", res);
        }
      });
    }
  },
  getters: {
    products(state) {
      const newData = [];
      for (let product in state.products) {
        newData.push(state.products[product]);
      };

      const filterData = [];
      newData.forEach((item, i) => {
        if (i % 10 === 0) {
          filterData.push([]);
        }
        const page = parseInt(i / 10);
        filterData[page].push(item);
      });
      return filterData;
    },
    CategoryProducts(state) {
      const newData = [];
      for (let product in state.products) {
        if (state.products[product].category === state.category)
        newData.push(state.products[product]);
      };
      const filterData = [];
      newData.forEach((item, i) => {
        if (i % 10 === 0) {
          filterData.push([]);
        }
        const page = parseInt(i / 10);
        filterData[page].push(item);
      });
      return filterData;
    }
  }
});
