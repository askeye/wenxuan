 //导航栏的跳转，
 var w_top_item = document.querySelectorAll('.w_top_item2 a'); //全部a
 var w_top_list2 = document.querySelector('.w_top_list2'); //全部导航栏li
 console.log(w_top_item);
 console.log(w_top_list2);
 w_top_list2.onclick = function (e) {
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



 // 搜索框模糊搜索
 var ipt = document.getElementById('ipt')
 const k_booklist = document.querySelector('.k_booklist')
 const btn = document.getElementById('btn')
 ipt.oninput = function () {
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
                     val.onclick = function () {
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
 btn.onclick = function () {
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