<template>
    <div class="index">
        <h1 class="tc">h1大标题</h1>

        <p class="tc">
            1、js没有压缩 OK<br/>
            2、css没有压缩 OK<br/>
            3、没有弄file-loader、url-loader OK<br/>
            4、title没有显示出来 OK<br/>
            5、ExtractTextPlugin中filename相对的路径是哪个？ OK<br/>
            6、js、css没有生成sourceMap<br/>
            7、没有引入iview<br/>
            8、webpack-dev-server 代理设置 OK<br/>
            9、main.js的vue里面使用template和components页面不能渲染出来<br/>
            10、path的join和resolve区别？ OK<br/>
        </p>

        <div class="pic"></div>

        <div class="tc">{{ tableList }}</div>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'App',
        data: function() {
            return {
                tableList: null
            }
        },
        mounted: function() {
            this.init();
        },
        methods: {
            init: function() {
                var that = this;
                var instance = axios.create();

                instance({
                    method: 'post',
                    url: '/api/saofu-shop-card/camp/alipay/list',
                    url: '/api/res.json',
                    params: {}
                })
                .then(function(res) {
                    that.searchLock = false; // 解除锁定

                    if(res.data.success) {
                        that.tableList = res.data;
                    } else {
                        console.log(333);
                    }
                })
                .catch(function(err) {
                    console.log(555);
                });

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/alipay-type';

    body {
        background: #fefefe;
    }
    h1 {
        color: #ff0000;
        color: green;
    }
    .index {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .tc {
            text-align: center;
        }
        .pic {
            margin: 0 auto;
            width: 500px;
            height: 500px;
            background: url('./images/bg.jpg') center center no-repeat;
        }

    }
</style>
