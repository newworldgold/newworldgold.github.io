$(function () {
    var inputFocustext = '';
    $('body').on('focus', 'input[type=text]', function () {
        inputFocustext = $(this).attr('placeholder')
        $(this).attr('placeholder', '')
    })
    $('body').on('blur', 'input[type=text]', function () {
        $(this).attr('placeholder', inputFocustext)
    })
    //侧边vip
    $('.commonSilde .silder-l').click(function () {
        $(this).parents('.commonSilde').toggleClass('active')
    })

    $('.couponSilde').on('click', '.silder-r a', function () {
        if ($(this).hasClass('waiting')) {
            return false;
        }
        var str = document.cookie;
        //将值切割成数组
        var arr = str.split(";");
        var token;
        //遍历数组
        for (var i = 0; i < arr.length; i++) {
            var value = arr[i].split("=");
            if (value[0] == ' iggm_token') {
                token = value[1];
            }
        }
        if (token) {
            var id = $(this).attr('id')
            var that = $(this)
            $.ajax({
                url: siteUrl + '/index/sendCoupon',
                data: { id: id },
                type: 'get',
                dataType: 'json',
                beforeSend: function () {
                    that.find('i').css('display', 'block')
                    that.find('span').hide()
                    that.addClass('waiting')
                },
                success: function (res) {
                    that.find('i').hide()
                    that.find('span').show()
                    if (res.code == 0) {
                        that.after('<div class="errorTips successTips"><p><i class="ico"></i>SUCCESS</p><span>' + res.msg + '</span></div>')
                    } else {
                        that.after('<div class="errorTips"><p><i class="ico"></i>ERROR</p><span>' + res.msg + '</span></div>')
                    }
                    couponTimer = setTimeout(function () {
                        $('.errorTips').remove()
                        that.removeClass('waiting')
                    }, 2000)
                }
            })
        } else {
            $('.login.dialog').addClass('display')
            $('.wrapper').show()
            $('.modal').show()
        }
    })


    resize()
    function resize() {
        $('.header .header-nav li.other div a.boosting').remove()
        $('.header .header-nav li.other div a.items').remove()
        if (document.documentElement.clientWidth < 1360) {
            $('.header .header-nav li.boosting').hide()
            $('.header .header-nav li.other div').append('<a class="boosting" href="' + siteUrl + '/new-world-boosting">New World Boosting</a>')
        } else if (document.documentElement.clientWidth > 1360) {
            $('.header .header-nav li.boosting').show()
            $('.header .header-nav li.other div a.boosting').remove()
        }

        if (document.documentElement.clientWidth < 1140) {
            $('.header .header-nav li.items').hide()
            $('.header .header-nav li.other div').append('<a class="items" href="' + siteUrl + '/new-world-items">New World Items</a>')
        } else if (document.documentElement.clientWidth > 1140) {
            $('.header .header-nav li.items').show()
            $('.header .header-nav li.other div a.items').remove()
        }
    }

    window.onresize = function () {
        resize()
    }
    $('.header .header-nav li').each(function () {
        if (location.href == $(this).find('a').attr('href')) {
            $(this).addClass('active').siblings('li').removeClass('active')
        }
    })
    /* 头部 */
    $('.right .lang-currency').hover(function () {
        $(this).find('.curr-content').addClass('display')
    }, function () {
        $(this).find('.curr-content').removeClass('display')
        $('.lang-box-c').slideUp()
        $('.right .lang-currency .lang-box-t .arrow').removeClass('show')
    })

    $('.right .lang-currency .lang-box-t').click(function () {
        $(this).siblings('.lang-box-c').slideToggle(100)
        $(this).find('.arrow').toggleClass('show')
    })

    $('.right .cart').hover(function () {
        $(this).find('.cart-link').addClass('display')
        $(this).find('.cart-link ul').addClass('hover-show')
    }, function () {
        if ($(this).find('.cart-link ul').hasClass('show')) {
        } else {
            $(this).find('.cart-link').removeClass('display')
        }
        $(this).find('.cart-link ul').removeClass('hover-show')
    })

    $('.right .account').on('click', 'a', function () {
        var type = $(this).attr('datatype')
        $('.wrapper').show()
        $('.modal').show()
        $('.wrapper .dialog').each(function () {
            if ($(this).attr('datatype') == type) {
                $(this).addClass('display')
            }
        })
      if(type==2){
        calculateTime(); //进行时间计算
      }

    })

    //other
    $('.header-nav li.other').click(function () {
        $(this).find('div').toggle()
        $(this).find('a i').toggleClass('up')
    })

    //注册
    $('.wrapper .sign').on('click', 'button', function () {
        signAjax()
    })

    //登录
    $('.wrapper .login').on('click', 'button', function () {
        loginAjax()
    })


    //绑定
    $('.wrapper .binding').on('click', 'button', function () {
        bindAjax()
    })


  /**
   * 计算时间
   */
  function calculateTime(){
    var new_timestamp = Math.round(new Date().getTime()/1000);
    var valid_timestamp =localStorage['valid_timestamp']
    $('.dif_text').text('');
    $('.dif_text').show();
    if (valid_timestamp == undefined || valid_timestamp < new_timestamp) {
      $('.sign-up-btn').attr('disabled', false);
      $('.sign-up-btn').removeAttr('style')
    } else {
      $('.sign-up-btn').attr('disabled', true);
      $('.sign-up-btn').css({"background": "#b1b1a9"})
      countDown()
      int_count = self.setInterval(countDown, 1000)
    }
  }

  /**
   * 倒计时
   */
    function countDown(){
    var new_timestamp = Math.round(new Date().getTime()/1000);
    var valid_timestamp =localStorage['valid_timestamp']
    var dif_timestamp = valid_timestamp -  new_timestamp
    var dif_text=''
    if(dif_timestamp >60){
      var minute = parseInt(dif_timestamp/60)
      var second = dif_timestamp - (60 * minute)
      dif_text =minute + 'min' + second +'s'
    }else {
      dif_text =dif_timestamp +'s';
    }
    if(dif_timestamp<=0){
      clearInterval(int_count);
      $('.sign-up-btn').attr('disabled',false);
      $('.sign-up-btn').removeAttr('style');
      $('.dif_text').hide();
    }else{
      $('.dif_text').text('（' + dif_text +'）')
    }
  }

    function loginAjax() {
        $('.login .input-box').removeClass('required')
        $('.tips').remove()
        var username, pwd, usernameReq, pwdReq
        username = $('.login .email .username').val()
        pwd = $('.login .pass .password').val()
        usernameReq = /^[\w\.\-]+@[\w\.\-]+(\.\w+)+$/;
        pwdReq = /^[a-zA-Z0-9]{6,}$/;
        var status = $('.wrapper .login .checked input').prop('checked')
        if (status) {
            var keep_login = '1'
        } else {
            var keep_login = '0'
        }
        if (username == '') {
            validation($(".login .email .input-box"), $('.login .email .username'), "This field is required")
            $(".login .email .username").focus();
            return false;
        } else {
            if (!usernameReq.test(username)) {
                validation($(".login .input-box"), $('.login .email .username'), "Please enter a valid email address")
                $(".login .email .username").focus();
                return false;
            }
        }
        if (pwd == '') {
            validation($(".login .input-box"), $('.login .pass .password'), "This field is required")
            $(".login .pass .password").focus();
            return false;
        } else {
            if (pwd.trim().length < 6) {
                validation($(".login .input-box"), $('.login .pass .password'), "Password length should be minimum 6 characters")
                $(".login .pass .password").focus();
                return false;
            }
        }
        $.ajax({
            url: siteUrl + '/login/index',
            type: 'post',
            dataType: 'json',
            data: {
                email: username,
                password: pwd,
                keep_login: keep_login
            },
            beforeSend: function () {
                $('.wrapper .login button span').hide()
                $('.wrapper .login button i').css('display', 'block')
                $('.wrapper .login button').attr('disabled', true)
            },
            success: function (res) {
                if (res.code == 0) {
                    window.location.reload()
                } else {
                    $('.wrapper .login button i').hide()
                    $('.wrapper .login button').after('<div class="errorTips"><p><i class="ico"></i>ERROR</p><span>' + res.msg + '</span></div>')
                    $('.wrapper .login button').addClass('error')
                    setTimeout(function () {
                        $('.errorTips').remove()
                        $('.wrapper .login button').attr('disabled', false)
                        $('.wrapper .login button span').show()
                        $('.wrapper .login button').removeClass('error')
                    }, 2000)
                }
            },
            error: function () {
                setTimeout(function () {
                    $('.errorTips').remove()
                    $('.wrapper .login button i').hide()
                    $('.wrapper .login button').attr('disabled', false)
                    $('.wrapper .login button span').show()
                    $('.wrapper .login button').removeClass('error')
                }, 2000)
            }
        })
    }

    function signAjax() {
        $('.sign .input-box').removeClass('required')
        $(".tips").remove();
        var username, pwd, repwd, usernameReq, pwdReq
        username = $('.sign .email .username').val()
        pwd = $('.sign .pass .password').val()
        repwd = $('.sign .repass .repwd').val()
        usernameReq = /^[\w\.\-]+@[\w\.\-]+(\.\w+)+$/;
        pwdReq = /^[a-zA-Z0-9]{6,}$/;

        if (username == '') {
            validation($(".sign .email .input-box"), $('.sign .email .username'), "This field is required")
            $(".sign .email .username").focus();
            return false;
        } else {
            if (!usernameReq.test(username)) {
                validation($(".sign .input-box"), $('.sign .email .username'), "Please enter a valid email address")
                $(".sign .email .username").focus();
                return false;
            }
        }
        if (pwd == '') {
            validation($(".sign .input-box"), $('.sign .pass .password'), "This field is required")
            $(".sign .pass .password").focus();
            return false;
        } else {
            if (pwd.trim().length < 6) {
                validation($(".sign .input-box"), $('.sign .pass .password'), "Password length should be minimum 6 characters")
                $(".sign .pass .password").focus();
                return false;
            }
        }
        if (pwd !== repwd) {
            validation($(".sign .input-box"), $('.sign .repass .repwd'), "Password does not match")
            $(".sign .repass .repwd").focus();
            return false;
        }
        var accept_check = $('.accept input').prop('checked');
        if(accept_check===false){
          $(".sign .input-box").removeClass("required");
          $(".tips").remove();
          $('.sign .accept').append($('<div class="tips" style="color:#ff0000;margin-top: 5px;font-size: 12px">' + 'This field is required check' + "</div>"))
          $(".sign .accept input").addClass("required");
          $(".sign .accept").focus();
          return false;
        }
        $.ajax({
            url: siteUrl + '/register/index',
            type: 'post',
            dataType: 'json',
            data: {
                email: username,
                password: pwd,
                password_confirm: repwd,
            },
            beforeSend: function () {
                $('.wrapper .sign button span').hide()
                $('.wrapper .sign button i').css('display', 'block')
                $('.wrapper .sign button').attr('disabled', true)
            },
            success: function (res) {
                if (res.code == 0) {
                    //window.location.reload()
                  $('.send-email').show();
                  $('.wrapper .dialog').removeClass('display');
                  localStorage['valid_timestamp']= Math.round(new Date().getTime()/1000) + 600;  //记录十分钟之后的时间戳
                  calculateTime();  //进行时间的计算  以及倒计时

                  $('.wrapper .sign button i').hide()
                  $('.errorTips').remove()
                  $('.wrapper .sign button span').show()
                  $('.wrapper .sign button').removeClass('error')
                  $('.wrapper .sign button').attr('disabled', false)
                } else {
                    $('.wrapper .sign button i').hide()
                    $('.wrapper .sign button').addClass('error')
                    $('.wrapper .sign button').after('<div class="errorTips"><p><i class="ico"></i>ERROR</p><span>' + res.msg + '</span></div>')
                    setTimeout(function () {
                        $('.errorTips').remove()
                        $('.wrapper .sign button span').show()
                        $('.wrapper .sign button').removeClass('error')
                        $('.wrapper .sign button').attr('disabled', false)
                    }, 2000)
                }
            },
            error: function () {
                setTimeout(function () {
                    $('.wrapper .sign button i').hide()
                    $('.errorTips').remove()
                    $('.wrapper .sign button span').show()
                    $('.wrapper .sign button').removeClass('error')
                    $('.wrapper .sign button').attr('disabled', false)
                }, 2000)
            }
        })
    }

    function bindAjax() {
        $('.binding .input-box').removeClass('required')
        $(".tips").remove();
        var username, pwd, repwd, usernameReq, pwdReq
        username = $('.binding .email .username').val()
        pwd = $('.binding .pass .password').val()
        repwd = $('.binding .repass .repwd').val()
        usernameReq = /^[\w\.\-]+@[\w\.\-]+(\.\w+)+$/;
        pwdReq = /^[a-zA-Z0-9]{6,}$/;
        if (username == '') {
            validation($(".binding .email .input-box"), $('.binding .email .username'), "This field is required")
            $(".binding .email .username").focus();
            return false;
        } else {
            if (!usernameReq.test(username)) {
                validation($(".binding .input-box"), $('.binding .email .username'), "Please enter a valid email address")
                $(".binding .email .username").focus();
                return false;
            }
        }
        if (pwd == '') {
            validation($(".binding .input-box"), $('.binding .pass .password'), "This field is required")
            $(".binding .pass .password").focus();
            return false;
        } else {
            if (pwd.trim().length < 6) {
                validation($(".binding .input-box"), $('.binding .pass .password'), "Password length should be minimum 6 characters")
                $(".binding .pass .password").focus();
                return false;
            }
        }
        if (pwd !== repwd) {
            validation($(".binding .input-box"), $('.binding .repass .repwd'), "Password does not match")
            $(".binding .repass .repwd").focus();
            return false;
        }
        $.ajax({
            url: siteUrl + '/register/bind',
            type: 'post',
            dataType: 'json',
            data: {
                email: username,
                password: pwd,
                password_confirm: repwd,
            },
            beforeSend: function () {
                $('.wrapper .binding button span').hide()
                $('.wrapper .binding button i').css('display', 'block')
                $('.wrapper .binding button').attr('disabled', true)
            },
            success: function (res) {
                if (res.code == 0) {
                    location.href = siteUrl + '/user'
                } else {
                    $('.wrapper .binding button i').hide()
                    $('.wrapper .binding button').addClass('error')
                    $('.wrapper .binding button').after('<div class="errorTips"><p><i class="ico"></i>ERROR</p><span>' + res.msg + '</span></div>')
                    setTimeout(function () {
                        $('.errorTips').remove()
                        $('.wrapper .binding button span').show()
                        $('.wrapper .binding button').removeClass('error')
                        $('.wrapper .binding button').attr('disabled', false)
                    }, 2000)
                }
            },
            error: function () {
                setTimeout(function () {
                    $('.wrapper .binding button i').hide()
                    $('.errorTips').remove()
                    $('.wrapper .binding button span').show()
                    $('.wrapper .binding button').removeClass('error')
                    $('.wrapper .binding button').attr('disabled', false)
                }, 2000)
            }
        })
    }

    $('.wrapper .dialog input').keydown(function (e) {
        if (e.which == 13) {
            if ($('.wrapper .dialog.display').attr('datatype') == 1) {
                loginAjax()
            } else {
                signAjax()
            }
        }
    })


    function validation(parent, ele, tip) {
        parent.removeClass("required");
        ele.parent(".input-box").addClass("required");
        $(".tips").remove();
        ele.parent(".input-box").append($('<div class="tips">' + tip + "</div>"))
    }

    $('.wrapper .dialog i.close-ico').click(function () {
        $('.wrapper').hide()
        $('.modal').hide()
        $('.wrapper .dialog').removeClass('display')
        $.removeCookie('iggm_bind_user')
        $('.send-email').hide();
      if(typeof(int_count)!=='undefined'){
        window.clearInterval(int_count)
      }
    })

    $('.login-to-sign').click(function () {
        $('.wrapper').show()
        $('.modal').show()
        $('.wrapper .login').addClass('display')
        $('.wrapper .sign').removeClass('display')
        $('.wrapper .binding').hide()
      if(typeof(int_count)!=='undefined'){
        window.clearInterval(int_count)
      }
    })

    $('.sign-to-log').click(function () {
        $('.wrapper').show()
        $('.modal').show()
        $('.wrapper .sign').addClass('display')
        $('.wrapper .login').removeClass('display')
        $('.wrapper .binding').hide()
        calculateTime();

    })

    /*  头部end  */


    //数字输入框
    $('body').on('input', 'input.number-input', function () {
        var value = $(this).val()
        var val = value.replace(/[^0-9]/g, '')
        $(this).val(val)
    })


    /* 底部 */


    // 获取当前语言
    var currenctLang = $('.header .right .lang-content .lang-box .lang-box-c a[data-type=' + current_lang + '] p').text()
    $('.header .right .lang-content .lang-box .lang-box-t p').text(currenctLang)
    $('.header .right .language span.country').addClass(current_lang)



    $('body').on('click', function (e) {
        if (!$('.nav .search').is(e.target) && $('.nav .search').has(e.target).length === 0) {
            $('.nav .search').removeClass('display')
        }

        if (!$('.header-nav .other').is(e.target) && $('.header-nav .other').has(e.target).length === 0) {
            $('.header-nav .other div').hide()
            $('.header-nav .other>a i').removeClass('up')
        }
    })


    //货币切换
    $('.header .curr-content .currency-box .lang-box-c a').click(function () {
        $('.header .curr-content .currency-box .lang-box-c').stop(false).slideUp(100)
        var rate = $(this).attr('data-rate')
        var currency_name = $(this).find('p').text()
        var symbol = $(this).find('span').text()
        localStorage['rate'] = rate
        localStorage['currency_name'] = currency_name
        $.cookie('cur_name', currency_name, { path: '/' })
        localStorage['symbol'] = symbol

        $('.header .lang-currency p.curr-name').attr('data-rate', rate)
        $('.header .lang-currency p.curr-name').text(currency_name)
        $('.header .lang-currency span.curr-code').text(symbol)
        $('.header .curr-content .currency-box span.curr-code').text(symbol)
        priceCalc()
    })


    setCurrency()
    function setCurrency() {
        if (!localStorage["currency_name"] || !localStorage["symbol"] || !localStorage["rate"]) {
            localStorage["currency_name"] = currency.code
            localStorage["symbol"] = currency.symbol
            localStorage["rate"] = currency.rate
            $.cookie('cur_name', currency.code, { path: '/' })
        } else {
            $.cookie('cur_name', localStorage["currency_name"])
        }
        $('.header .lang-currency p.curr-name').attr('data-rate', localStorage["rate"])
        $('.header .lang-currency p.curr-name').text(localStorage["currency_name"])
        $('.header .lang-currency span.curr-code').text(localStorage["symbol"])
        $('.header .curr-content .currency-box span.curr-code').text(localStorage["symbol"])
    }
    // 货币计算
    function priceCalc() {
        var rate = $('.header .lang-currency>p.curr-name').attr('data-rate')
        var symbol = localStorage["symbol"]
        //计算出美元
        var price = $('.price')
        price.each(function () {
            $(this).find('strong').text(symbol)
            var lkr = $(this).attr('lkr')
            var price = (lkr * rate).toFixed(2)
            $(this).find('i').text(price)
        })

        var goods_price = $('.goods .goods-list .price')
        goods_price.each(function () {
            var lkr = $(this).attr('lkr')
            var num = $(this).parents('.item').find('.item-num input').val()
            var newLkr = num * lkr
            var price = (newLkr * rate).toFixed(2)
            $(this).find('i').text(price)
        })

        if ($('.shopcart .cart-list').length > 0) {
            var checkoutPirce = $('.shopcart .cart-list .price')
            checkoutPirce.each(function () {
                var lkr = $(this).attr('lkr')
                var num = $(this).parents('tr').find('input').val()
                var newLkr = num * lkr
                var price = (newLkr * rate).toFixed(2)
                $(this).find('i').text(price)
            })
        }

        //首页活动
        var flashPrice = $('.flash_sale .flash_right .swiper-slide .price')
        flashPrice.each(function () {
            var lkr = $(this).attr('lkr')
            var num = $(this).parents('.swiper-slide').find('input').val()
            var newLkr = num * lkr
            var price = (newLkr * rate).toFixed(2)
            $(this).find('i').text(price)
        })
    }


    //判断购物车数量
    function headerTopCartNum() {
        if (localStorage['cart'] && localStorage['cart'] != '') {
            var HeaderShopCart = JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("cart"))))
            var list = HeaderShopCart.list
            if (list.length == 1) {
                $('.header .cart .cart-total em').hide()
            } else {
                $('.header .cart .cart-total em').show()
            }
            $('.header .cart .cart_num').text(list.length)
            $('.header .cart .item-num').text(list.length)
        }
    }
    checkoutList()
    headerTopCartNum()
    headerCartFor()
    priceCalc()
    function headerCartFor() {
        if (!localStorage['cart'] || localStorage['cart'] == '') {
            $('#headerCarts').html('')
            $('.cart .cart-link .noCart').show()
            $('.cart .cart-link .cart-total').hide()
            $('.cart .cart-link .cart-button').hide()
            return false;
        }
        var HeaderShopCart = JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("cart"))))
        let html = template('headerCart', HeaderShopCart)
        $('#headerCarts').html(html)
        let list = HeaderShopCart.list
        var lkrprice = 0;
        for (var i = 0; i < list.length; i++) {
            lkrprice = lkrprice + (list[i].num * list[i].price)
        }
        $('.header .cart .cart-link .cart-total .price').attr('lkr', lkrprice)
        if ($('.shopcart .order-info').length > 0) {
            $('.shopcart .order-info .items-price .price').attr('lkr', lkrprice)
        }
        if (list.length == 0) {
            $('.cart .cart-link .noCart').show()
            $('.cart .cart-link .cart-total').hide()
            $('.cart .cart-link .cart-button').hide()
        } else {
            $('.cart .cart-link .noCart').hide()
            $('.cart .cart-link .cart-total').show()
            $('.cart .cart-link .cart-button').show()
        }
    }

    function checkoutList() {
        if ($('#shoping-list').length > 0 && $('.orderRePay').length == 0) {
            if (!localStorage['cart'] || localStorage['cart'] == '') {
                $('#shoping-list').html('')
                $('.cart .cart-link .noCart').show()
                $('.cart .cart-link .cart-total').hide()
                $('.cart .cart-link .cart-button').hide()
                return false;
            }
            var shopCart = JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("cart"))))
            var arraylist = shopCart.list
            if ((arraylist[0].min_level && arraylist[0].min_level != '') || (arraylist[0].reputations && arraylist[0].reputations != '')) {
                let boostArr = []
                if (arraylist[0].reputations == 'tbc') {
                    for (var i = 0; i < arraylist.length; i++) {
                        var remark = arraylist[i].remarkTitle.remark
                        var reputations = [];
                        for (var j = 0; j < remark.length; j++) {
                            reputations.push(remark[j].title)
                        }
                        var objs = {
                            goods_no: arraylist[i].goods_no,
                            reputations: reputations.join(',')
                        }
                        boostArr.push(objs)
                    }
                } else {
                    for (var i = 0; i < arraylist.length; i++) {
                        var objs = {
                            goods_no: arraylist[i].goods_no,
                            start: arraylist[i].min_level,
                            end: arraylist[i].max_level
                        }
                        boostArr.push(objs)
                    }
                }
                $.ajax({
                    url: siteUrl + '/cart/returnBoostingPrice',
                    data: {
                        goods: JSON.stringify(boostArr)
                    },
                    type: 'post',
                    dataType: 'json',
                    success: function (res) {
                        var data = res.data
                        for (var i = 0; i < data.length; i++) {
                            for (j = 0; j < arraylist.length; j++) {
                                if (data[i].goods_no == arraylist[j].goods_no) {
                                    if (arraylist[j].reputations && arraylist[j].reputations == 'tbc') {
                                        arraylist[j].price = data[i].price
                                    } else {
                                        if (arraylist[j].remarkTitle.remark && arraylist[j].remarkTitle.remark.length > 0) {
                                            var remark = arraylist[j].remarkTitle.remark
                                            arraylist[j].price = parseFloat(data[i].price)
                                            for (var n = 0; n < remark.length; n++) {
                                                arraylist[j].price += parseFloat(remark[n].price)
                                            }
                                        } else {
                                            arraylist[j].price = data[i].price
                                        }

                                        if (arraylist[j].remarkTitle.speed && arraylist[j].remarkTitle.speed != '') {
                                            arraylist[j].price += parseFloat(arraylist[j].remarkTitle.speed.price)
                                        }
                                    }
                                }

                                if (data[i].goods_no == arraylist[j].goods_no) {
                                    if (data[i].status != 1) {
                                        arraylist.splice(j, 1)
                                    }
                                }
                            }
                        }

                        if (arraylist.length == 0) {
                            location.href = siteUrl
                        }
                        shopCart.list = arraylist
                        localStorage['cart'] = window.btoa(window.encodeURIComponent(JSON.stringify(shopCart)))
                        var html = template('cart-goods', shopCart)
                        $('#shoping-list').html(html)
                        $('.payment-method .payment-info li').eq(0).click()
                        $('.cart-left .shoping-list-mask').remove()
                        $('.cart-right .cart-goods-mask').remove()
                        headerCartFor()
                        calcPaymentMethod()
                        priceCalc()
                        if ($('.delivery-info').length > 0) {
                            var game_sku = shopCart.list[0].game_sku
                            $('.delivery-info').load(siteUrl + '/cart/loadGameTemp/game_sku/' + game_sku, function () { });
                        }
                    }
                })
            } else {
                let obj = {}
                for (var i = 0; i < arraylist.length; i++) {
                    if (arraylist[i].price_num) {
                        obj[arraylist[i].goods_no + '_' + arraylist[i].price_num] = arraylist[i].price_num
                    } else {
                        obj[arraylist[i].goods_no + '_' + arraylist[i].num] = arraylist[i].num
                    }
                }
                let goods_no = JSON.stringify(obj)
                $.ajax({
                    url: siteUrl + '/cart/returnCurPrice',
                    data: {
                        goods_no: goods_no
                    },
                    type: 'post',
                    dataType: 'json',
                    success: function (res) {
                        var data = res.data
                        for (var i = 0; i < data.length; i++) {
                            for (j = 0; j < arraylist.length; j++) {
                                if (typeof arraylist[j].price_num == 'undefined') {
                                    if (data[i].goods_no == arraylist[j].goods_no) {
                                        arraylist[j].price = data[i].price
                                    }
                                } else {
                                    if (data[i].num == arraylist[j].price_num && data[i].goods_no == arraylist[j].goods_no) {
                                        arraylist[j].price = data[i].amount
                                    }
                                }
                                if (data[i].goods_no == arraylist[j].goods_no) {
                                    if (data[i].status != 1) {
                                        arraylist.splice(j, 1)
                                    }
                                }
                            }
                        }
                        if (arraylist.length == 0) {
                            location.href = siteUrl
                        }
                        shopCart.list = arraylist
                        localStorage['cart'] = window.btoa(window.encodeURIComponent(JSON.stringify(shopCart)))
                        var html = template('cart-goods', shopCart)
                        $('#shoping-list').html(html)
                        $('.payment-method .payment-info li').eq(0).click()
                        $('.cart-left .shoping-list-mask').remove()
                        $('.cart-right .cart-goods-mask').remove()
                        headerCartFor()
                        calcPaymentMethod()
                        priceCalc()
                        if ($('.delivery-info').length > 0) {
                            var game_sku = shopCart.list[0].game_sku
                            $('.delivery-info').load(siteUrl + '/cart/loadGameTemp/game_sku/' + game_sku, function () {
                                if ($('.tax-exclusive-price').length > 0) {
                                    var num = 0;
                                    for (var i = 0; i < arraylist.length; i++) {
                                        num += parseFloat(arraylist[i].price_num)
                                    }
                                    $('.tax-exclusive-price').find('input').val(num)
                                    $('.tax-exclusive-price').attr('max_num', num)
                                }
                            });
                        }
                    }
                })
            }
        }
    }


    // 计算购物车的payment价格
    function calcPaymentMethod() {
        var itemPrice = $('.items-price .price').attr('lkr')
        var payment = $('.payment-method .payment-info ul li')
        payment.each(function () {
            var fee = $(this).attr('data-num')
            var price = (0.5 + (parseFloat(itemPrice) * fee))
            $(this).find('.hot-con .price').attr('lkr', price)
            $(this).find('.hot-con .price i').text((price * localStorage['rate']).toFixed(2))
        })
    }
    //头部购物车删除
    var deleteFlag = false;
    $('.header .cart .cart-link ul').on('click', 'li i.delete', function () {
        if (deleteFlag) {
            return false;
        }
        deleteFlag = true
        $(this).parents('.cart-item').find('.delete-tips').addClass('display')
        $('.header .cart .cart-link ul').addClass('show')
        var that = $(this)
        setTimeout(function () {
            var HeaderShopCart = JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("cart"))))
            var index = that.parent('li').index()
            HeaderShopCart.list.splice(index, 1)
            if (HeaderShopCart.list.length == 0) {
                if ($('.shopcart').length > 0) {
                    $('.shopcart').html(noCartHtml)
                    $('.main').css('min-height', $(window).height() - $('.footer').outerHeight(true));
                }
            }
            if (HeaderShopCart.list.length == 1) {
                $('.header .cart .cart-total em').hide()
            } else {
                $('.header .cart .cart-total em').show()
            }
            $('.header .cart .item-num').text(HeaderShopCart.list.length)
            $('.header .cart .cart_num').text(HeaderShopCart.list.length)
            localStorage['cart'] = window.btoa(window.encodeURIComponent(JSON.stringify(HeaderShopCart)))
            headerCartFor()
            checkoutList()
            priceCalc()
            $('.header .cart .cart-link ul').removeClass('show')
            if (!$('.header .cart .cart-link ul').hasClass('hover-show')) {
                $('.header .cart .cart-link').removeClass('display')
            }
            deleteFlag = false
        }, 2000)
    })

    //购物车页删除
    var shopCartIndex = '';
    $('.shopcart .cart-list').on('click', 'tr i.delete', function () {
        shopCartIndex = $(this).parents('tr').index()
    })

    $('body').on('click', '.delete-modal-box.delete-one-box button.yes', function () {
        var HeaderShopCart = JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("cart"))))
        HeaderShopCart.list.splice(shopCartIndex, 1)
        if (HeaderShopCart.list.length == 0) {
            $('.shopcart').html(noCartHtml)
            $('.main').css('min-height', $(window).height() - $('.footer').outerHeight(true));
        }
        if (HeaderShopCart.list.length == 1) {
            $('.header .cart .cart-total em').hide()
        } else {
            $('.header .cart .cart-total em').show()
        }
        $('.header .cart .item-num').text(HeaderShopCart.list.length)
        $('.header .cart .cart_num').text(HeaderShopCart.list.length)

        localStorage['cart'] = window.btoa(window.encodeURIComponent(JSON.stringify(HeaderShopCart)))
        headerCartFor()
        checkoutList()
        priceCalc()
    })

    // // 清空所有购物车 
    $('body').on('click', '.header .cart button.clear-btn', function () {
        $('.main').append(deletePublicHtml)
        $('.modal').show()
    })

    $('body').on('click', '.delete-public-box button.yes', function () {
        $('.delete-public-box').remove()
        $('.modal').hide()
        localStorage.removeItem('cart')
        $('.header .cart .cart_num').text(0)
        $('.header .cart .item-num').text(0)
        headerCartFor()
        checkoutList()
        priceCalc()
        if (typeof noCartHtml == 'undefined') {
        } else {
            $('.shopcart').html(noCartHtml)
            $('.main').css('min-height', $(window).height() - $('.footer').outerHeight(true));
        }
        // 
    })
    $('body').on('click', '.delete-public-box .delete-close', function () {
        $('.delete-public-box').remove()
        $('.modal').hide()
    })

    $('body').on('click', '.list-buttom button.clear-btn', function () {
        $('.main').append(deletecartHtml)
        $('.delete-modal-box').removeClass('delete-one-box').addClass('delete-all-box')
        $('.waiting-modal').show()
    })

    $('body').on('click', '.delete-modal-box.delete-all-box button.yes', function () {
        $('.shopcart').html(noCartHtml)
        $('.main').css('min-height', $(window).height() - $('.footer').outerHeight(true));
        $('.waiting-modal').hide()
        $('.delete-modal-box').removeClass('display')
        localStorage.removeItem('cart')
        $('.header .cart .cart_num').text(0)
        $('.header .cart .item-num').text(0)
    })

    //购物车页加数量
    $('.shopcart .cart-list').on('click', 'tr .shop-num .sub', function () {
        var val = $(this).siblings('input').val()
        var min_num = $(this).siblings('input').attr('data-num')
        var length = min_num.length
        var HeaderShopCart = JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("cart"))))
        var index = $(this).parents('tr').index()
        var that = $(this)
        if (val - min_num < min_num) {
            var newsVal = min_num
        } else {
            if (length >= 3) {
                var newsVal = val - 100
            } else if (length == 2) {
                var newsVal = val - 10
            } else {
                var newsVal = val - 1
            }
        }
        $(this).siblings('input').val(newsVal)
        HeaderShopCart.list[index].num = newsVal
        localStorage['cart'] = window.btoa(window.encodeURIComponent(JSON.stringify(HeaderShopCart)))
        checkoutPrice(that, newsVal)
        headerCartFor()
        priceCalc()
    })


    $('.shopcart .cart-list').on('click', 'tr .shop-num .add', function () {
        var val = $(this).siblings('input').val()
        var min_num = $(this).siblings('input').attr('data-num')
        var max_num = $(this).siblings('input').attr('max')
        var length = min_num.length
        var HeaderShopCart = JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("cart"))))
        var index = $(this).parents('tr').index()
        var that = $(this)
        if (parseFloat(val) >= parseFloat(max_num)) {
            var newsVal = max_num
        } else {
            if (length >= 3) {
                var newsVal = parseFloat(val) + 100
            } else if (length == 2) {
                var newsVal = parseFloat(val) + 10
            } else {
                var newsVal = parseFloat(val) + 1
            }
        }
        $(this).siblings('input').val(newsVal)
        HeaderShopCart.list[index].num = newsVal
        localStorage['cart'] = window.btoa(window.encodeURIComponent(JSON.stringify(HeaderShopCart)))
        checkoutPrice(that, newsVal)
        headerCartFor()
        priceCalc()

    })


    $('.shopcart .cart-list').on('blur', 'tr .shop-num input', function () {
        var val = $(this).val()
        var min_num = $(this).attr('data-num')
        var HeaderShopCart = JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("cart"))))
        var index = $(this).parents('tr').index()
        var max_num = $(this).attr('max')
        var that = $(this)
        if (parseFloat(val) >= parseFloat(max_num)) {
            val = max_num
            $(this).val(val)
        }
        if (val == '' || parseFloat(val) < min_num) {
            $(this).val(min_num)
            val = min_num
        }
        HeaderShopCart.list[index].num = val
        localStorage['cart'] = window.btoa(window.encodeURIComponent(JSON.stringify(HeaderShopCart)))
        headerCartFor()
        checkoutPrice(that, val)
        priceCalc()
    })

    //计算商品价格
    function checkoutPrice(that, num) {
        var lkr = that.parents('tr').find('.price').attr('lkr')
        var rate = localStorage['rate']
        var newLkr = num * lkr
        var newsPrice = (newLkr * rate).toFixed(2)
        that.parents('tr').find('.price i').text(newsPrice)
    }


    //退出登录
    $('.logout').click(function () {
        localStorage.removeItem('cart')
    })


    //搜索
    $('.nav .search').click(function () {
        $(this).addClass('display')
    })


    //头部搜索
    var hotKeyword = [];
    var otherKeyword = [];
    $('.header .search input').on('focus', function () {
        $('.search-modal').show()
        $.ajax({
            url: siteUrl + '/ajax/search_keyword',
            type: 'get',
            success: function (res) {
                hotKeyword = res.data.hot
                otherKeyword = res.data.other
                var html = '';
                for (var i = 0; i < hotKeyword.length; i++) {
                    html += '<a href="' + siteUrl + hotKeyword[i].url + '"><span>' + hotKeyword[i].keyword + '</span><img src="/static/pc/image/hotSearch.png"/></a>'
                }
                $('.search .search-key div').html(html)
                $('.search .search-key').addClass('display')
            }
        })
    })

    $('.header .search input').on('input', function () {
        var val = $(this).val()
        if (val != '') {
            var newHot = hotKeyword.filter(function (item) {
                return item.keyword.toLowerCase().indexOf(val.toLowerCase()) > -1
            })

            var newOther = otherKeyword.filter(function (item) {
                return item.keyword.toLowerCase().indexOf(val.toLowerCase()) > -1
            })

            if (val.toLowerCase() == 'wow') {
                var html = '<a href="' + siteUrl + '/tbc-classic-gold"><span>tbc classic gold</span><img src="/static/pc/image/hotSearch.png"/></a>';
            } else {
                var html = '';
            }
            for (var i = 0; i < newHot.length; i++) {
                html += '<a href="' + siteUrl + newHot[i].url + '"><span>' + newHot[i].keyword + '</span><img src="/static/pc/image/hotSearch.png"/></a>'
            }
            for (var i = 0; i < newOther.length; i++) {
                html += '<a href="' + siteUrl + newOther[i].url + '">' + newOther[i].keyword + '</a>'
            }
        } else {
            var html = '';
            for (var i = 0; i < hotKeyword.length; i++) {
                html += '<a href="' + siteUrl + hotKeyword[i].url + '"><span>' + hotKeyword[i].keyword + '</span><img src="/static/pc/image/hotSearch.png"/></a>'
            }
        }
        $('.search .search-key div').html(html)
        $('.search .search-key').addClass('display')
    })

    $('.search-modal').on('click', function () {
        $('.search .search-key').removeClass('display')
        $('.search-modal').hide()
    })


    // 回到顶部
    $('.back-top-button').click(function () {
        $('html,body').animate({
            scrollTop: '0'
        }, 300);
    })

    $(window).scroll(function () {
        var top = $(this).scrollTop()
        if (top > 500) {
            $('.back-top-button').show()
        } else {
            $('.back-top-button').hide()
        }
    })

    function SetCookie(name, value, options) {
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }

    function getCookie(cookiename) {
        var result = "";
        var mycookie = document.cookie;
        var start2 = mycookie.indexOf(cookiename + "=");
        if (start2 > -1) {
            start = mycookie.indexOf("=", start2) + 1;
            var end = mycookie.indexOf(";", start);
            if (end === -1) {
                end = mycookie.length;
            }
            result = decodeURIComponent(mycookie.substring(start, end));
        }
        return result;
    }
})
