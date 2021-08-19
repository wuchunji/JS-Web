// 控制台报的错误和警告 都是iframe标签报的 不用管
// 视频弹窗功能
(function() {
    var video = document.querySelector('#section1 .video'),
        dialog = document.querySelector('.dialog'),
        shadow = document.querySelector('.shadow'),
        closeBtn = document.querySelector('.dialog .closeBtn'),
        movie = document.querySelector('.dialog .movie'),
        movieInner = movie.innerHTML;

    video.addEventListener('click', function() {
        dialog.style.display = 'block';
        shadow.style.display = 'block';
        movie.innerHTML = movieInner;
    }, false)

    closeBtn.onclick = function() {
        dialog.style.display = 'none';
        shadow.style.display = 'none';
        movie.innerHTML = '';
    }
})();


// 选项卡
(function() {
    function tab(btn, con) {
        // 取到每个选项卡的选项和内容
        var btns = btn.children,
            cons = con.children;
        
        for(var i = 0; i < btns.length; i++) {
            btns[i].index = i; // 给按钮一个索引值，方便内容区与其匹配
            btns[i].onclick = function() {
                for(var i = 0; i < btns.length; i++) {
                    btns[i].classList.remove('active');
                    cons[i].classList.remove('active');
                }
                this.classList.add('active');
                cons[this.index].classList.add('active');
                // 只能用这种方式对应到内容匹配的按钮，当点击事件触发时 最外层的i已经完成循环变成一个不是绑定事件时候的值了
            }
        }
    }

    var tabBtn = document.querySelectorAll('.tabBtn'),
        tabContent = document.querySelectorAll('.tabContent');
    for(var i = 0; i < tabBtn.length; i++) {
        tab(tabBtn[i], tabContent[i]);
    }
})();


// 轮播图
(function() {
    function carousel(id) {
        var wrap = document.querySelector(id + ' .wrap'),
            ul = document.querySelector(id + ' ul'),
            prev = document.querySelector(id + ' .prev'),
            next = document.querySelector(id + ' .next'),
            circles = document.querySelectorAll(id + ' .circle span'),
            boxWidth = wrap.offsetWidth;

        ul.innerHTML += ul.innerHTML;
        var len = ul.children.length;
        ul.style.width = len * boxWidth + 'px';

        var cn = 0,  // 当前图片的索引
            ln = 0;  // 上一张图片的索引

        next.onclick = function() {
            cn++;
            move();
        }
        prev.onclick = function() {
            if(cn == 0) {
                cn = len/2;
                ul.style.transition = '';
                ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)'; 
            }
            
            // 做一个异步处理，否则如果n=0 move函数执行会把空的transition变成0.3s
            setTimeout(function() {
                cn --;
                move();
            }, 13) 
        }

        function move() {
            ul.style.transition = '.3s';
            ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';
            
            /*
                同步圆点
                原始 cn: 0 1 2 3 4 5 6 7 
                最终 hn: 0 1 2 3 0 1 2 3
                算法： cn%(len/2) 
            */
            var hn = cn%(len/2);
            circles[ln].className = '';
            circles[hn].className = 'active';

            ln = hn;
        }

        // 做一个监听处理 不能点的过快 因为设置了动画的播放为0.3s 如果在监听到之前就被点击了 那么就会出现BUG
        ul.addEventListener('transitionend', function() {
            if(cn == len/2) {
                cn = 0;
                ul.style.transition = '';
                ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)'
            }
        }, false)
        
    }

    carousel('#section3');
    carousel('#section5');
})();


// 单层选项卡
(function() {
    var ul = document.querySelector('#section4 ul'),
        section4 = document.querySelector('#section4'),
        bottom = document.querySelector('#section4 .bottom'),
        lis = ul.children,
        ln = 0; // 上一次选项的索引值
    for(var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function() {
            // 方案一（简单粗暴但效率低）
            // for(var i = 0; i < lis.length; i++) {
            //     lis[i].classList.remove('active');
            // }
            // this.classList.add('active');
            // section4.style.background = 'url(images/section4_big_0' + (this.index + 1) + '.png) no-repeat center top';
            // bottom.style.background = 'url(images/section4_big_0' + (this.index + 1) + '_bottom.png) no-repeat center top';

            // 方案二 (效率高)
            lis[ln].classList.remove('active');
            this.classList.add('active');
            section4.style.background = 'url(images/section4_big_0' + (this.index + 1) + '.png) no-repeat center top';
            bottom.style.background = 'url(images/section4_big_0' + (this.index + 1) + '_bottom.png) no-repeat center top';
            ln = this.index;
        }
    }
})();


// 手风琴
(function() {
    var lis = document.querySelectorAll('#section7 ul li'),
        ln = 0; // 上一次选项的索引值
    for(var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function() {
            // 方案一（简单粗暴但效率低）
            // for(var i = 0; i < lis.length; i++) {
            //     lis[i].classList.remove('active');
            // }
            // this.classList.add('active');


            // 方案二 (效率高)
            console.log(1);
            lis[ln].classList.remove('active');
            this.classList.add('active');
            ln = this.index;
        }
    }
})();

// section8 轮播图
(function() {
    var ul = document.querySelector('#section8 ul'),
        prev = document.querySelector('#section8 .prev'),
        next = document.querySelector('#section8 .next'),
        circle = document.querySelectorAll('#section8 .circle span'),
        lis = ul.children,
        len = ul.children.length,
        cn = 0,
        ln = 0;
    
    next.onclick = function() {
        cn++;
        ul.appendChild(lis[0]);
        
        // 如果当前索引值为最后一个span
        if(cn == len) {
            cn = 0;
        }
        circle[ln].className = '';
        circle[cn].className = 'active';

        ln = cn;
    }
    prev.onclick = function() {
        ul.insertBefore(lis[len - 1], lis[0]); // 在第一个li前插入最后一个li

        if(cn == 0) {
            cn = len;
        }
        cn--;
        circle[ln].className = '';
        circle[cn].className = 'active';

        ln = cn;
    }
})();