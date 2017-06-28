<template>
    <div class="index">
        <h1 class="tc">功能测试页面</h1>

        <p class="tc">请把 url-loader 的 limit 值设置为 430000，审查元素下面的图片，查看是否使用了base64</p>
        <div class="pic"></div>

        <div class="cnode-sec">
            <p>
                下面的cnode列表是devServer配置后获取的数据输出点，如果没有输出内容，请确认配置是否正确<br>
                <span>可以尝试把设置代理 proxy下面的changeOrigin设置为false，再npm run dev 看下效果（会请求不到列表数据了）</span>
            </p>

            <h3>cnode社区首页topics列表</h3>

            <ul class="ul">
                <li v-for="(item, index) in topicsList" v-if="index < 10">
                    <a :href="'https://cnodejs.org/topic/' + item.id" target="_blank">{{ item.title }}</a>
                    <span> --- 作者： {{ item.author.loginname }}</span>
                </li>
            </ul>

        </div>
        <!-- end cnode-sec -->

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'App',
        data: function() {
            return {
                topicsList: null
            }
        },
        mounted: function() {
            this.init();
        },
        methods: {
            init: function() {
                var that = this;

                axios.get('/topics')
                .then(function(res) {
                    that.searchLock = false; // 解除锁定

                    if(res.data.success) {
                        that.topicsList = res.data.data;
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
    .index {
        width: 100%;
        height: 100%;
        overflow: hidden;

        h1 {
            color: #ff0000;
            color: green;
        }

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
    .cnode-sec {
        margin: 0 auto;
        width: 700px;
        overflow: hidden;

        p {
            text-align: left;
            span {
                color: red;
            }
        }

        @at-root .ul {
            padding: 0 0 50px 0;
            width: 700px;
            height: auto;
            list-style: none;

            li {
                height: 30px;
                line-height: 30px;
                text-align: left;
                font-size: 14px;

                a {
                    color: green;
                    text-decoration: none;
                }

                span {
                    font-size: 13px;
                    color: gray;
                }
            }
        }
    }
</style>
