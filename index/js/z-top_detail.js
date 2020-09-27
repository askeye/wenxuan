window.onload = function () {

    //渲染数据
    const column = document.querySelector('.z_right-column');
    const list = document.querySelectorAll('.z_top-list li')
    const lists = document.querySelectorAll('.z_top-list li a')
    const keys = location.search.split('=')[1];
    localStorage.setItem('index1',keys)
    var index2 = localStorage.getItem('index1')

    function getdata(url) {
        fetch(url).then(response => {
            return response.json()
        }).then(res => {
            var data = res.data
            var str = ""
            for (var i = 0; i < res.data.length; i++) {
                str += `
                    <div class="z_right-item" data-p=${res.data[i].id}>
                    <!-- 图标 红色-->
                    <div class="z_tu">
                        <span class="z_tu_zi">${i + 1}</span>
                    </div>
                    <div class="z_zuo"></div>
                    <div class="z_you"></div>
                    <div class="z_item-img">
                        <a href="javascript:void(0)"><img src="${res.data[i].imgurl} " alt=""></a>
                    </div>
                    <div class="z_item-desc">
                        <p class="z_item-title"> <a href="javascript:void(0)">${res.data[i].title}</a> </p>
                        <p class="z_item-point">${res.data[i].desc}</p>
                        <p class="z_item-author">${res.data[i].author}<span class="z_tex">/</span> <span class="z_text">${res.data[i].publish}</span></p>
                        <div class="z_price">
                            <span class="z_new-price">￥${res.data[i].newprice}</span>
                            <del class="z_old-price">￥${res.data[i].oldprice}</del>
                            <span class="z_discount">（${res.data[i].discount}折）</span>
                        </div>
                        <div class="z_shopp">
                            <a href="javascript:void(0)">
                                <i class="iconfont icon-icon-"></i>
                                <span>加入购物车</span>
                            </a>
                        </div>
                    </div>
                </div>
                    `
            }
            column.innerHTML = str
            if (keys == '%E7%AB%A5%E4%B9%A6%E8%82%B2%E5%84%BF') {
                index2 = 2
            } else if (keys == '%E6%96%87%E5%AD%A6%E5%B0%8F%E8%AF%B4') {
                index2 = 3
            } else if (keys == '%E7%A4%BE%E7%A7%91%E7%BB%8F%E7%AE%A1') {
                index2 = 4
            } else if (keys == '%E6%95%99%E6%9D%90%E6%95%99%E8%BE%85') {
                index2 = 6
            } else if (keys == '%E7%94%9F%E6%B4%BB%E8%89%BA%E6%9C%AF') {
                index2 = 7
            } else if (keys == '%E5%85%A8%E9%83%A8') {
                index2 = 0
            } else if (keys == '%E6%8A%98%E6%89%A3') {
                index2 = 1
            } else if (keys == '%E8%A1%8C%E4%B8%9A%E8%81%8C%E4%B8%9A') {
                index2 = 5
            }
            list[index2].classList.add('active')
            const z_right_item = document.getElementsByClassName('z_right-item');
            for (var i = 0; i < z_right_item.length; i++) {
                z_right_item[i].addEventListener('click', function () {
                    var w_numm = this.getAttribute('data-p');
                    console.log(w_numm);
                    location.href = `./detail.html?id=${w_numm}`
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }





    lists.forEach((val, index) => {
        val.setAttribute('data-i', index)
        val.onclick = function () {
            // lists.forEach(val=>{
            //     val.parentElement.classList.remove('active')
            // })
            // this.parentElement.classList.add('active')
            var w_top_index = this.getAttribute('data-i');
            console.log(w_top_index);
            var w_top_txt = '';
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
            console.log(w_top_txt);
            localStorage.setItem('index1', index)

            this.href = './z_top_detail.html?keys=' + w_top_txt;

        }


    })
    if (keys == '%E5%85%A8%E9%83%A8') {
        console.log(1111);
        getdata('http://localhost:3000/z_all')

        return
    } else if (keys == '%E6%8A%98%E6%89%A3') {
        getdata('http://localhost:3000/z_discount')
        return
    } else {
        getdata(`http://localhost:3000/z_index?keys=${keys}`)
        return
    }




    // var b = document.querySelector('.z_top-list li')
    // // b.onclick=function(){
    // //     b.classList.add('active')
    // // }

    // lists.onclick = function (e) {
    //     console.log(11111, e);
    //     b.className = 'active'
    //     console.log(e.target.dataset.i);
    //     var ab = e.target.dataset.i
    //     getdata(ab)
    // }

    // function jsonp(url, params, callback) {
    //     var FunName = "fn";
    //     window[FunName] = callback;
    //     var script = document.createElement("script");
    //     var url = params ? url + "?" + params + "&callback=" + FunName : url + "?callback=" + FunName;
    //     script.src = url;
    //     document.body.appendChild(script);
    //     document.body.removeChild(script);
    // }
    // jsonp("http://localhost/z_index.php",'', function (data) {
    //     console.log(data);
    //         for (var i = 0; i < data.length; i++) {
    //             column.innerHTML += `
    //     <div class="z_right-item">
    //     <!-- 图标 红色-->
    //     <div class="z_tu">
    //         <span class="z_tu_zi">${i+1}</span>
    //     </div>
    //     <div class="z_zuo"></div>
    //     <div class="z_you"></div>
    //     <div class="z_item-img">
    //         <a href=""><img src="${data[i].image} " alt=""></a>
    //     </div>
    //     <div class="z_item-desc">
    //         <p class="z_item-title"> <a href="">${data[i].title}</a> </p>
    //         <p class="z_item-point">${data[i].desc}</p>
    //         <p class="z_item-author">${data[i].author}<span class="z_tex">/</span> <span class="z_text">${data[i].from}</span></p>
    //         <div class="z_price">
    //             <span class="z_new-price">${data[i].new_price}</span>
    //             <del class="z_old-price">${data[i].old_price}</del>
    //             <span class="z_discount">${data[i].zhekou}</span>
    //         </div>
    //         <div class="z_shopp">
    //             <a href="">
    //                 <i class="iconfont icon-icon-"></i>
    //                 <span>加入购物车</span>
    //             </a>
    //         </div>
    //     </div>
    // </div>
    //         `
    //         }

    // })

}