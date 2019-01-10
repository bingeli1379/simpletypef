<template>
  <div class="container page_height py-5">
    <loading :active.sync="isLoading"></loading>
    <div class="row">
      <div class="col-md-2">
        <Sidebar></Sidebar>
      </div>
      <div class="col-md-10">
        <div class="text-right">
          <button class="btn btn-primary" @click="openModal(true)">建立新商品</button>
        </div>
        <div class="row my-5">
          <div class="col-md-6 mb-4" v-for="item in CategoryProducts[currentPage]" :key="item.id">
            <div class="card border-0 shadow-sm">
              <a class="card-body badge-light" href="#">
                <div style="height: 300px; background-size: cover; background-position: center"
                :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                <h5 class="card-title">
                  <p class="h4 text-dark">{{ item.title }}</p>
                  <p class="h4 text-dark">{{ item.brand }}</p>
                </h5>
                <div class="d-flex justify-content-between align-items-baseline">
                  <div class="h6 mr-2 ml-auto" v-if="item.price === item.origin_price">NT{{ item.origin_price | currency }}</div>
                  <del class="h6 mr-2 ml-auto" v-if="item.price !== item.origin_price">NT{{ item.origin_price | currency }}</del>
                  <div class="h5 text-danger" v-if="item.price !== item.origin_price">NT{{ item.price | currency }}</div>
                </div>
              </a>
              <div class="card-footer d-flex">
                <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯商品</button>
                <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="openDelModal(item)">刪除商品</button>
              </div>
            </div>
          </div>
        </div>
        
        <nav aria-label="Page navigation example">
          <ul class="pagination d-flex justify-content-center">
            <li class="page-item" :class="{'disabled': currentPage === 0}">
              <a class="page-link" href="#" aria-label="Previous" @click="currentPage -= 1">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item" v-for="page in CategoryProducts.length" :key="page":class="{'active': currentPage === page - 1}">
              <a class="page-link" href="#" @click="currentPage = page - 1">{{ page }}</a>
            </li>
            <li class="page-item" :class="{'disabled': currentPage == CategoryProducts.length -1}">
              <a class="page-link" href="#" aria-label="Next" @click="currentPage += 1">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
        
      </div>
    </div>

    

    <div class="modal fade mt-5" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">商品名稱</label>
                  <input type="text" class="form-control" id="title" v-model="tempProduct.title"
                    placeholder="請輸入商品名稱">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="brand">品牌</label>
                    <select class="form-control" id="brand" v-model="tempProduct.brand">
                      <option value="" disabled>請選擇品牌</option>
                      <option value="Carhartt">Carhartt</option>
                      <option value="Guess">Guess</option>
                      <option value="Sport b.">Sport b.</option>
                      <option value="Zara">Zara</option>
                      <option value="Levis">Levis</option>
                      <option value="Gucci">Gucci</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="category">類別</label>
                    <select class="form-control" id="category" v-model="tempProduct.category">
                      <option value="" disabled>請選擇類別</option>
                      <option value="coat">外套</option>
                      <option value="clothes">上衣</option>
                      <option value="pants">下身</option>
                      <option value="bag">包款</option>
                      <option value="home">家居</option>
                      <option value="accessory">配件</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price" v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price" v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="sex">性別</label>
                    <select class="form-control" id="sex" v-model="tempProduct.sex">
                      <option value="">無</option>
                      <option value="MEN">男</option>
                      <option value="WOMEN">女</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="size">尺寸</label>
                    <select class="form-control" id="size" v-model="tempProduct.size">
                      <option value="">無</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="content">產品介紹</label>
                  <textarea type="text" class="form-control" id="content" v-model="tempProduct.content"
                    placeholder="請輸入產品介紹"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade mt-5" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters } from "vuex";

import Sidebar from "../components/Admin_sidebar";

export default {
  name: "Product",
  components: {
    Sidebar
  },
  data() {
    return {
      tempProduct: {},
      isNew: false,
      currentPage: 0,
      status: {
        fileUploading: false
      }
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    ...mapGetters(["CategoryProducts"])
  },
  methods: {
    category() {
      const category = "pants";
      this.$store.commit("CATEGORY", category);
    },
    getProducts() {
      this.$store.dispatch("getProducts");
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = { 
        category: "",
        brand: "",
        sex: "",
        size: ""
        };
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    openDelModal(item) {
      this.tempProduct = Object.assign({}, item);
      $("#delProductModal").modal("show");
    },
    delProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/admin/product/${vm.tempProduct.id}`;
      vm.$http.delete(api).then(res => {
        if (res.data.success) {
          $("#delProductModal").modal("hide");
          vm.getProducts();
        } else {
          $("#delProductModal").modal("hide");
          vm.$store.dispatch("alertMessage", res);
        }
      })
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/admin/product`;
      const vm = this;
      let httpMethod = "post";
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then(res => {
        if (res.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
        } else {
          vm.$store.dispatch("alertMessage", res);
        }
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(api, formData, {headers:{"Content-Type": "multipart/form-data"}}).then(res => {
        vm.status.fileUploading = false;
        if (res.data.success) {
          vm.$set(vm.tempProduct, "imageUrl", res.data.imageUrl);
        } else {
          vm.$store.dispatch("alertMessage", res);
        }
      });
    }
  },
  created() {
    this.getProducts();
    this.category();
  }
};
</script>
