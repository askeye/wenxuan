window.onload = function() {
    // 导航上的登录接口 start
    const w_go = document.getElementById('w_go');
    const w_sign = document.getElementById('w_sign');
    const w_username = document.getElementById('w_username');
    const w_quit = document.getElementById('w_quit');
    const w_user_welcom = document.getElementById('w_user_welcom');
    const w_count = document.getElementById('w_count');
    if (localStorage.getItem('admin') == null) {
        w_go.style.display = 'block';
        w_sign.style.display = 'block';
        w_quit.style.display = 'none';
        w_username.style.display = 'none';
    } else {
        var w_user_txt = localStorage.getItem('admin')
        w_go.style.display = 'none';
        w_sign.style.display = 'none';
        w_quit.style.display = 'block';
        w_username.style.display = 'block';
        w_username.innerHTML = w_user_txt;
        w_user_welcom.innerHTML = '您好';
    }
    w_username.onclick = function() {
        w_username.href = './js_myWenxuan.html?admin=' + w_user_txt;
    }
    w_count.onclick = function() {
        w_count.href = './b_account.html?admin=' + w_user_txt;
    }
    w_quit.onclick = function() {
            w_go.style.display = 'block';
            w_sign.style.display = 'block';
            w_quit.style.display = 'none';
            w_username.style.display = 'none';
            localStorage.removeItem('admin');
            var nums11 = document.querySelector('#num');
            var sum11 = function() {
                if (localStorage.getItem('admin') == null) {
                    // console.log('没有登陆');
                    nums11.style.opacity = '0'
                } else {
                    var admin = localStorage.getItem('admin')
                        // console.log('已登陆');
                    fetch('http://localhost:3000/car_num?user=' + admin).then(response => {
                        return response.json()
                    }).then(res => {
                        // console.log(res[0].nums);
                        nums11.innerHTML = res[0].nums
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
            sum11();
        }
        // 导航上的登录接口 end


    // 购物车小图标数字
    var nums11 = document.querySelector('#num');
    var sum11 = function() {
        if (localStorage.getItem('admin') == null) {
            // console.log('没有登陆');
            nums11.style.opacity = '0'
        } else {
            var admin = localStorage.getItem('admin')
                // console.log('已登陆');
            fetch('http://localhost:3000/car_num?user=' + admin).then(response => {
                return response.json()
            }).then(res => {
                // console.log(res[0].nums);
                nums11.innerHTML = res[0].nums
            }).catch(err => {
                console.log(err)
            })
        }
    }
    sum11();

    // 搜索框模糊搜索
    var ipt = document.getElementById('ipt')
    const k_booklist = document.querySelector('.k_booklist')
    const btn = document.getElementById('btn')
    ipt.oninput = function() {
        console.log(1111);
        k_booklist.innerHTML = ''
        iptval = ipt.value
        if (iptval.trim() != '') {
            fetch('http://localhost:3000/fuzzy?iptval=' + iptval, {
                method: "GET"
            }).then(response => {
                return response.json()
            }).then(res => {
                if (res.data != '') {
                    k_booklist.innerHTML = ''
                    k_booklist.style.display = 'block';
                    for (var i = 0; i < res.data.length; i++) {
                        k_booklist.innerHTML += `
                            <a href="javascript:;">
                            <span class='k_searchtitle' onclick="gettitle()" data-knum=${res.data[i].id}>${res.data[i].title}</span>
                            <span style="color: green;">约1条</span>
                            </a>
                        `
                    }
                    var iptitem = document.querySelectorAll('.k_searchtitle')
                    iptitem.forEach(val => {
                        val.onclick = function() {
                            ipt.value = val.innerHTML
                            console.log(val.dataset['knum']);
                            ipt.setAttribute('data-wnum', val.dataset['knum'])
                            k_booklist.innerHTML = ''
                        }
                    })

                } else {
                    k_booklist.style.display = 'none'
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            k_booklist.style.display = 'none'
        }
    }
    btn.onclick = function() {
        iptval = ipt.value
        if (iptval.trim() != '') {
            fetch('http://localhost:3000/fuzzy?iptval=' + iptval, {
                method: "GET"
            }).then(response => {
                return response.json()
            }).then(res => {
                if (res.data != '') {
                    location.href = `./detail.html?id=${ipt.dataset['wnum']}`
                } else {
                    alert('你输入的内容查询不到！')
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
    var w_id = location.search.split('=')[1];
    //图书信息数据渲染
    var news = document.querySelector('.y_news');
    fetch('http://localhost:3000/ydetail?id=' + w_id).then(response => {
        return response.json();
    }).then(res => {
        console.log(res.data);
        const b_time = res.data[0].publish_time
        console.log(b_time);

        news.innerHTML = `
                    <div class="y_title">
                        <h1>${res.data[0].title}</h1>
                        <p>${res.data[0].desc}</p>
                    </div>
                    <!-- 图书详情 -->
                    <div class="y_attr">
                        <dl class="y_price">
                            <dt>定　　价 ：</dt>
                            <dd class="y_oldPrice">￥${res.data[0].newprice}</dd>
                        </dl>
                        <dl class="y_sellling">
                            <dt>文 轩 价 ：</dt>
                            <dd><strong>￥${res.data[0].oldprice}</strong> <span>（${res.data[0].discount}折）</span></dd>
                        </dl>
                        <dl class="y_gps">
                            <dt>配 送 至 ：</dt>
                            <dd><input type="text" class="address" placeholder="中国四川省成都市"> <span>现在有货</span><br><b>文轩网 <span>正版图书音像</span> ，为您快捷发货</b>
                                <a href="javascript:;">（配送详情）</a>
                            </dd>
                        </dl>
                        <dl class="y_author">
                            <dt>作　　者 ：</dt>
                            <dd><a href="javascript:;">${res.data[0].author}</a></dd>
                        </dl>
                        <dl class="y_class">
                            <dt>所属分类 ：</dt>
                            <dd><a href="javascript:;">图书</a><span>></span><a href="javascript:;">${res.data[0].type}</a><span>></span><a href="javascript:;">${res.data[0].sub_type}</a> </dd>
                        </dl>
                        <dl class="y_class ">
                            <dt>促销活动 ：</dt>
                            <dd class="y_page">❤【文轩秒杀】0903 <br>❤老客户回馈，积分换礼券，购书更实惠<br>❤大陆非新疆西藏地区包邮，新疆西藏运费每单20元 <a href="javascript:;">详情>></a> </dd>
                        </dl>
                        <dl class="y_number">
                            <dt>购买数量 ：</dt>
                            <dd><a href="javascript:;" class="y_remov">-</a><input type="text" value="1" class="y_number_txt"><a href="javascript:;" class="y_add">+</a>&nbsp;&nbsp;件</dd>
                        </dl>
                        <dl class="y_purchase">
                            <dd>
                                <a href="javascript:;" class="tipsa"></a>
                            </dd>
                        </dl>
                        <dl class="y_service">
                            <dt>服务 ：</dt>
                            <dd><span>由"文轩网"直接销售和发货，并提供售后服务</span><br>
                                <a href="javascript:;">正品低价</a><span class="cut">|</span><a href="javascript:;">闪电发货</a><span class="cut">|</span><a href="javascript:;">货到付款</a><span class="cut">|</span><a href="javascript:;">高效退换货</a>
                            </dd>
                        </dl>
                    </div>
                `
            // 放大镜图片渲染
        var imgs = document.querySelector('.y_wrap_imgs');
        imgs.innerHTML = `
                <div class="y_img">
                <div class="y_wrap_box"></div>
                <div class="y_tag"></div>
                <img src="${res.data[0].imgurl}" width='350px'>
                </div>
                <div class="y_img y_bigimg">
                    <img src="${res.data[0].imgurl}" width='600px'>
                </div>
                `
            //第二个价格渲染
        var y_head_r = document.querySelector('.y_head_r ');
        y_head_r.innerHTML = `
                    <strong>￥${res.data[0].newprice}</strong> <span>（${res.data[0].discount}折）</span>
                    <a href="javascript:;" class="y_right spirit"></a>
                `
            //作者出版社渲染
        var y_content_author = document.querySelector('.y_content_author');
        y_content_author.innerHTML = `
                    <span>作者:</span><a href="javascript:;" class="select">${res.data[0].author}</a>
                    `
        var y_content_press = document.querySelector('.y_content_press');
        y_content_press.innerHTML = `
                    <span>出版社:</span><a href="javascript:;" class="select">${res.data[0].publish}</a>
                    `
            // 详情图片的渲染
        var mainimg = document.querySelector('.y_navBnner');
        mainimg.innerHTML = `
         <img src="${res.data[0].descimgurl}" alt="">
        `
            // 目录渲染
        var y_bottom = document.querySelector('.y_bottom');
        y_bottom.innerHTML = `
            ${res.data[0].directory}
            <a href="###" class="y_hiden_all">隐藏全部>></a>
        `
            //作者简介等
        var y_author = document.querySelector('#author .y_bottom'); //作者简介
        var y_editing = document.querySelector('#editing .y_bottom'); //主编推荐
        var y_synopsis = document.querySelector('#synopsis .y_bottom'); //内容简介
        y_author.innerHTML = `
            ${res.data[0].aboutauthor}
        `
        y_editing.innerHTML = `
            ${res.data[0].recommend}
        `
        y_synopsis.innerHTML = `
            ${res.data[0].contentabstract}
        `
        var add = document.getElementsByClassName('y_add')[0];
        var remo = document.getElementsByClassName('y_remov')[0];
        var num = document.getElementsByClassName('y_number_txt')[0];
        // 点击+号增加数量
        add.onclick = function() {
                num.value++
            }
            // 点击-号减少数量
        remo.onclick = function() {
                if (num.value <= 0) {
                    num.value == 0;
                } else {
                    num.value--
                }
            }
            // 放大镜特效
        var simg = document.querySelector('.y_img'); //小图片
        var shade = document.querySelector('.y_wrap_box'); //遮罩
        var bimg = document.querySelector('.y_bigimg img'); //大图片
        var bimgs = document.querySelector('.y_bigimg'); //大图片
        var wrap = document.querySelector('.y_wrap'); //大图片框
        simg.addEventListener('mouseover', function() {
            shade.style.display = 'block';
            bimgs.style.display = 'block';
        })
        simg.addEventListener('mousemove', function(e) {

            var x = e.clientX - wrap.offsetLeft - shade.offsetWidth / 2;
            if (x < 0) {
                x = 0;
            } else if (x > simg.offsetWidth - shade.offsetWidth) {
                x = simg.offsetWidth - shade.offsetWidth;
            }
            var y = e.clientY - wrap.offsetTop - shade.offsetHeight / 2;
            if (y < 0) {
                y = 0;
            } else if (y > simg.offsetHeight - shade.offsetHeight) {
                y = simg.offsetHeight - shade.offsetHeight;
            }
            shade.style.left = '' + x + 'px';
            shade.style.top = '' + y + 'px';
            beliel = bimg.offsetWidth / simg.offsetWidth;
            // console.log(beliel)  比列1.24
            bimg.style.transform = 'translate(' + -x * beliel + 'px,' + -y * beliel + 'px)';
        })
        simg.addEventListener('mouseout', function() {
            shade.style.display = 'none';
            bimgs.style.display = 'none';
        })


        // 点击商品介绍和评论切换
        var navs = document.querySelector(' .y_head_n');
        navs.addEventListener('click', function(e) {
                if (e.target.localName == 'a') {
                    for (var i = 0; i < navs.children.length; i++) {
                        navs.children[i].className = '';
                    }
                    e.target.className = 'select';
                }
            })
            //显示部分目录点击显示全部目录显示完整
        var catalog = document.querySelector('#catalog .y_bottom');
        if (catalog.offsetHeight > 180) {
            catalog.classList.add('y_bottoms');
        }
        //点击显示全部，显示所有
        var catashow = document.getElementsByClassName('y_show_all')[0];
        catashow.addEventListener('click', function() {
                catalog.classList.remove('y_bottoms');
                catashow.style.display = 'none';
            })
            //点击隐藏全部，还原
        var catahiden = document.getElementsByClassName('y_hiden_all')[0];
        catahiden.addEventListener('click', function() {
                catalog.classList.add('y_bottoms');
                catashow.style.display = 'block';

            })
            // 点击购物车按钮，加入购物车提示
        var tips = document.querySelector('.tips');
        var tipsa = document.querySelector('.tipsa');
        const b_title = document.querySelector('.y_news .y_title h1') //获取title
        const b_price = document.querySelector('.y_attr .y_sellling strong').innerHTML.split('￥')[1] - 0 //获取价格
        const b_img = document.querySelector('.y_img img') //获取img
        const b_book_id = location.search.split('=')[1] - 0




        tipsa.addEventListener('click', function() {
            tips.style.display = 'block';
            if (localStorage.getItem('admin') == null) {
                location.href = 'b_login.html'
            } else {
                const b_admin = localStorage.getItem('admin')
                const b_book_ids = []
                const b_book_nums = []
                fetch('http://localhost:3000/car?admin=' + b_admin).then(response => { //获取购物车内的id和对应的数量
                    return response.json();
                }).then(res => {
                    console.log(res);
                    for (var i = 0; i < res.length; i++) {
                        b_book_ids.push(res[i].book_id)
                        b_book_nums.push(res[i].number)
                    }
                    console.log(b_book_ids);
                    console.log(b_book_nums);

                    //加入购物车

                    const b_num = document.querySelector('.y_number_txt').value - 0 //获取数量

                    //获取id
                    if (b_book_ids.indexOf(b_book_id) != -1) {
                        const b_index = b_book_ids.indexOf(b_book_id)
                        const b_nums = b_book_nums[b_index] + b_num
                        console.log(b_nums);

                        fetch('http://localhost:3000/updatecar?num=' + b_nums + '&id=' + b_book_id).then(response => {
                            return response.json();
                        }).then(res => {
                            console.log(res);
                            console.log(121212);

                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        fetch('http://localhost:3000/addcar?title=' + b_title.innerHTML + '&price=' + b_price + '&num=' + b_num + '&imgurl=' + b_img.src + '&book_id=' + b_book_id + '&admin=' + b_admin).then(response => {
                            return response.json();
                        }).then(res => {
                            console.log(res);
                        }).catch(err => {
                            console.log(err);

                        })

                    }
                }).catch(err => {
                    console.log(err);

                })
            }
        })


        var close = document.querySelector('.close');
        close.addEventListener('click', function() {
            tips.style.display = 'none';
        })
        var purchase = document.querySelector('.tip_purchase');
        purchase.addEventListener('click', function() {
                tips.style.display = 'none';
            })
            //点击返回顶部显示和隐藏
        var top = document.getElementsByClassName('top')[0];
        window.onscroll = function() {
            // console.log(document.documentElement.scrollTop);
            if (document.documentElement.scrollTop >= 600) {
                top.style.display = 'block';
            } else {
                top.style.display = 'none';

            }
        }

        // 点击加入收藏显示和隐藏
        function getCollection() {
            fetch('http://localhost:3000/addcollection?title=' + b_title.innerHTML + '&newprice=' + b_price + '&oldprice=' + b_old_price + '&imgurl=' + b_img.src + '&book_id=' + b_book_id + '&admin=' + b_admin + '&publish=' + b_time).then(response => {
                return response.json();
            }).then(res => {
                collection.style.display = 'block';
            }).catch(err => {
                console.log(err);
            })
        }


        let b_admin = localStorage.getItem('admin')
        var collect = document.getElementsByClassName('y_collect')[0]; //加入收藏按钮
        var collection = document.getElementsByClassName('y_collection')[0];
        var cancel = document.getElementsByClassName('y_colle_cancel')[0];
        const b_old_price = document.querySelector('.y_oldPrice').innerHTML.split('￥')[1] - 0
        console.log(b_old_price);
        collect.onclick = function() {
            let b_collection_ids = []
            if (b_admin == null) {
                location.href = 'b_login.html'
            } else {
                fetch('http://localhost:3000/collection?admin=' + b_admin).then(response => {
                    return response.json();
                }).then(res => {
                    if (res.data.length == 0) {
                        getCollection()
                    } else {
                        for (var i = 0; i < res.data.length; i++) {
                            b_collection_ids.push(res.data[i].book_id)
                        }

                        //判断收藏是否重复
                        if (b_collection_ids.indexOf(b_book_id) != -1) {
                            alert('这本书被收藏过啦')
                        } else {
                            getCollection()
                        }
                    }

                }).catch(err => {
                    console.log(err);
                })
            }
        }
        cancel.onclick = function() {
            collection.style.display = 'none';
        }


        //导航栏的跳转，
        var w_top_item = document.querySelectorAll('.w_top_item2 a'); //全部a
        var w_top_list2 = document.querySelector('.w_top_list2'); //全部导航栏li
        w_top_list2.onclick = function(e) {
            if (e.target.localName == 'a') {
                var w_top_index = e.target.dataset.h;
                // var w_top_txt = '';
                if (w_top_index == 2) {
                    w_top_txt = '童书育儿'
                } else if (w_top_index == 3) {
                    w_top_txt = '文学小说'
                } else if (w_top_index == 4) {
                    w_top_txt = '社科经管'
                } else if (w_top_index == 7) {
                    w_top_txt = '教材教辅'
                } else if (w_top_index == 8) {
                    w_top_txt = '生活艺术'
                } else if (w_top_index == 0) {
                    w_top_txt = '全部'
                } else if (w_top_index == 1) {
                    w_top_txt = '折扣'
                } else if (w_top_index == 5) {
                    w_top_txt = '行业职业'
                } else if (w_top_index == 6) {
                    w_top_txt = '行业职业'
                }
                w_top_item[w_top_index].href = './z_top_detail.html?keys=' + w_top_txt;
            }
        }

        //星星的显示
        var k_stardesc = ['很差', '较差', '还行', '推荐', '力荐']
        var k_mystar = document.querySelector('.k_mystar')
        var k_mystar_item = k_mystar.querySelectorAll('span')
        var k_desc = k_mystar.querySelector('i')
        k_mystar_item.forEach((val, index) => {
            val.setAttribute('data-i', index)
            val.onmouseover = function() { //鼠标进入某个星星时
                val.style.backgroundPositionX = '-190px'
                k_desc.innerHTML = k_stardesc[index]
                var num = index
                k_mystar_item.forEach((val, index) => {
                    if (index > num) {
                        val.style.backgroundPositionX = '-217px'
                    }
                })
            }
        })
        k_mystar.onmouseout = function() { //鼠标离开时恢复原样
                k_mystar_item.forEach(val => {
                    val.style.backgroundPositionX = '-190px'
                    k_desc.innerHTML = ''
                })
            }
            //评论的tab切换
        var k_discuss_type_top = document.querySelector('.k_discuss_type_top')
        var k_type_content = document.querySelector('.k_type_content')
        k_discuss_type_top.onmouseover = function(e) {
            if (e.target.localName == 'span') {
                var k_tab_item = this.querySelectorAll('.k_tab_item')
                var k_type_item = k_type_content.querySelectorAll('p')
                k_tab_item.forEach((val, index) => {
                    val.setAttribute('data-i', index)
                    val.classList.remove('k_added')
                })
                k_type_item.forEach((val, index) => {
                    val.setAttribute('data-i', index)
                    val.style.display = 'none'
                })
                e.target.classList.add('k_added')
                k_type_item[e.target.dataset.i].style.display = 'block'
            }
        }
    }).catch(err => {
        console.log(err);
    })
}