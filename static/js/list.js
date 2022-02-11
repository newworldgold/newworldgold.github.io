
$(function () {
    // 图片懒加载
    $('.goods-list img').lazyload({
        threshold: 500
    })
    //获取默认类型
    $('.parent-cate ul li').click(function () {
        if ($(this).hasClass('active')) {
            return false;
        }
        $('.child-cate').removeClass('active')
        $('.child-cate ul li').removeClass('active')
        $(this).find('input').prop('checked', 'checked')
        $(this).addClass('active').siblings('li').removeClass('active')
        var id = $(this).attr('data-cate-id')
        $('.child-cate[data-cate-id=' + id + ']').addClass('active')
        $('.child-cate[data-cate-id=' + id + '] ul li').eq(0).addClass('active').siblings('li').removeClass('avtive')
        $('.child-cate[data-cate-id=' + id + '] ul li').eq(0).find('input').prop('checked', 'checked')
        ajaxList()
        selectTitle()
    })

    $('.child-cate ul li').click(function () {
        if ($(this).hasClass('active')) {
            return false;
        }
        $(this).find('input').prop('checked', 'checked')
        $(this).addClass('active').siblings('li').removeClass('active')
        ajaxList()
        selectTitle()
    })

    $('.child-server ul li').click(function () {
        if ($(this).hasClass('active')) {
            return false;
        }
        $(this).find('input').prop('checked', 'checked')
        $(this).addClass('active').siblings('li').removeClass('active')
        $(this).parents('.child-server').siblings('.child-server').find('li').removeClass('active')
        $(this).parents('.child-server').siblings('.child-server').find('input').prop('checked', false)
        ajaxList()
        var text = $(this).find('p').text()
        var devicetext = '';
        var servertext = '';
        if ($('.device.device-server ul li').length > 1) {
            $('.device.device-server').show()
            devicetext = $('.device.device-server ul li.active').text()
        }
        if ($('.server.device-server ul li').length > 1) {
            servertext = $('.server.device-server ul li.active').text()
        }
        if (devicetext == '') {
            $('.goods-header h2 p').text(servertext + ' - ' + text)
        } else {
            $('.goods-header h2 p').text(devicetext + ' - ' + servertext + ' - ' + text)

        }
        if (goods_game_sku == 'newworldgold253') {
            var goodsHeight = $('.goods').offset().top - $('.fixed-header').height()
            $('html,body').animate({
                scrollTop: goodsHeight -4
            }, 300);
        }
    })

    $('.device-server.device').on('click', 'li', function () {
        if ($(this).hasClass('active')) {
            return false;
        }
        var index = $(this).index()
        $(this).addClass('active').siblings('li').removeClass('active')
        $('.device-server.server ul').eq(index).addClass('active').siblings('ul').removeClass('active')
        serverSelect()
        if ($('.device-server.server ul').eq(index).text().trim() == '') {
            $('.device-server.server').hide()
        } else {
            $('.device-server.server').show()
        }
        cateSelect()
        ajaxList()
        selectTitle()
    })

    $('.device-server.server').on('click', 'li', function () {
        if ($(this).hasClass('active')) {
            return false;
        }
        $(this).addClass('active').siblings('li').removeClass('active')
        serverSelect()
        ajaxList()
        selectTitle()
    })

    function serverSelect() {
        var id = $('.server.device-server ul.active li.active').attr('data-id')
        if ($('.child-server[data-id=' + id + '] ul li').length == 0) {
            $('.child-server').removeClass('active')
        } else {
            $('.child-server[data-id=' + id + ']').addClass('active').siblings('.child-server').removeClass('active')
            if (goods_game_sku == 'newworldgold253') {
            } else {
                $('.child-server[data-id=' + id + '] ul li').eq(0).addClass('active').siblings('li').removeClass('active')
                $('.child-server[data-id=' + id + '] ul li').eq(0).find('input').prop('checked', 'checked')
                if ($('.child-server[data-id=' + id + ']').find('.child-server-select').length > 0) {
                    var text = $('.child-server[data-id=' + id + '] .child-server-select span.active').text()
                    letterSelect(id, text)
                }
            }
        }
    }

    cateSelect()
    function cateSelect() {
        var id = $('.device.device-server li.active').attr('data-device_id')
        if ($('.parent-cate[data-device_id=' + id + '] ul li').length == 0) {
            $('.parent-cate').removeClass('active')
        } else {
            $('.parent-cate[data-device_id=' + id + ']').addClass('active').siblings('.parent-cate').removeClass('active')
            $('.parent-cate[data-device_id=' + id + '] ul li').eq(0).addClass('active').siblings('li').removeClass('active')
            $('.parent-cate[data-device_id=' + id + '] ul li').eq(0).find('input').prop('checked', 'checked')
            var pid = $('.parent-cate.active ul li.active').attr('data-cate-id')
            $('.child-cate').removeClass('active')
            $('.child-cate[data-cate-id=' + pid + ']').addClass('active')
            $('.child-cate[data-cate-id=' + pid + '] ul li').eq(0).addClass('active').siblings('li').removeClass('active')
            $('.child-cate[data-cate-id=' + pid + '] ul li').eq(0).find('input').prop('checked', 'checked')
        }
    }

    selectTitle()
    function selectTitle() {
        var totalText = '';
        var devicetext = '';
        var servertext = '';
        var catetext = '';
        if ($('.device.device-server ul li').length == 1 && $('.server.device-server ul li').length == 0 && $('.parent-cate.active').length == 0) {
            $('.goods-header h2 p').hide()
            $('.goods-header h2 span').hide()
            $('.goods-header').css('justify-content', 'flex-end')
        } else {
            $('.goods-header h2 p').show()
            $('.goods-header h2 span').css('display','block')
        }

        if ($('.device.device-server ul li').length <= 1) {
            $('.device.device-server').hide()
        } else {
            $('.device.device-server').show()
            devicetext = $('.device.device-server ul li.active').text()
        }
        if ($('.server.device-server ul.active li').length <= 1) {
            $('.server.device-server').hide()
        } else {
            $('.server.device-server').show()
            servertext = $('.server.device-server ul.active li.active').text()
            serverSelect()
        }
        if ($('.child-server.active').length > 0) {
            if ($('.server.device-server ul li').length <= 1) {

            } else {
                if($('.child-server.active ul li.active').length>0) {
                    servertext += ' - ';
                }
            }
            servertext += $('.child-server.active ul li.active p').text()
        }

        if ($('.parent-cate.active ul li.active').length > 0) {
            catetext = $('.parent-cate.active ul li.active p').text()
        }

        if ($('.child-cate.active ul li.active').length > 0) {
            if ($('.parent-cate.active ul li.active').length > 0) {
                catetext += ' - '
            }
            catetext += $('.child-cate.active ul li.active p').text()
        }

        if (devicetext != '') {
            if (servertext != '') {
                if (catetext != '') {
                    totalText = devicetext + ' - ' + servertext + ' - ' + catetext
                } else {
                    totalText = devicetext + ' - ' + servertext
                }
            } else {
                if (catetext != '') {
                    totalText = devicetext + ' - ' + catetext
                } else {
                    totalText = devicetext
                }
            }
        } else {
            if (servertext != '') {
                if (catetext != '') {
                    totalText = servertext + ' - ' + catetext
                } else {
                    totalText = servertext
                }
            } else {
                totalText = catetext
            }
        }
        $('.goods-header h2 p').text(totalText)
    }
    if ($('.breadcrumb .category a span').text() == localStorage['game_name']) {
        $('.server.device-server ul.active li').eq(localStorage['game_index']).click()
    }
    //动态获取分类和服务器id
    function ajaxList() {
        var cate_id = 0;
        var server_id = $('.server.device-server ul.active input').attr('data-id');
        if ($('.server.device-server ul.active li.active').length > 0) {
            server_id = $('.server.device-server ul.active li.active').attr('data-id')
        }
        if ($('.child-server.active ul li.active').length > 0) {
            console.log($('.child-server.active ul li.active'));
            server_id = $('.child-server.active ul li.active').attr('data-id')
        }
        if ($('.parent-cate.active ul li.active').length > 0) {
            cate_id = $('.parent-cate.active ul li.active').attr('data-cate-id')
        }
        if ($('.child-cate.active ul li.active').length > 0) {
            cate_id = $('.child-cate.active ul li.active').attr('data-id')
        }
        $('.goods-list .noDataTips').hide()
        $('.goods-list ul').html('')
        $('.spinner').show()
        $('.item-quick-search input').val('')
        //循环列表
        $.ajax({
            url: siteUrl + '/goods/goods_ajax',
            type: 'get',
            dataType: 'json',
            data: { template_type: template_name, server_id: server_id, cate_id: cate_id },
            success: function (res) {
                pageFlag = false;
                currentPage = 1;
                $('.spinner').hide()
                var data = res.data
                if (template_name == 'golds') {
                    if (data.result_goods.length == 0) {
                        $('.goods-list .noDataTips').show()
                    }
                } else if (template_name == 'items') {
                    if (data.goods.length == 0) {
                        $('.goods-list .noDataTips').show()
                    } else {
                        for (var i = 0; i < data.goods.length; i++) {
                            data.goods[i].max = Math.ceil(2000 / data.goods[i].true_price)
                        }
                    }
                }
                var html = template('itemHtml', data)
                $('.goods-list ul').html(html)
                $('.goods-list img').lazyload({
                    threshold: 300
                })
                goodsPriceCalc()
                if (template_name == 'golds' && res.data.one_goods.price) {
                    good_rules = res.data.one_goods
                    price_rules = good_rules.rule
                    price_rules.sort(function (x, y) {
                        return x[0] - y[0]
                    })
                    quickGoodsRule()
                    $('.quick-search .count input').attr('disabled', false)
                } else {
                    $('.quick-search .price').attr('lkr', 0)
                    $('.quick-search .price i').text(0.00)
                    $('.quick-search .count input').attr('disabled', true)
                    $('.quick-search .count input').val('')
                    selectAttr()
                }
                swiperAjax()
            }
        })
    }

    // 多服务器时根据字母选择
    function letterSelect(id, text) {
        if (text == 'All') {
            $('.child-server[data-id=' + id + '] ul li').css('display', 'flex')
            return false;
        } else {
            var list = $('.child-server[data-id=' + id + '] ul li')
            list.each(function () {
                if ($(this).find('p').text().substr(0, 1) == text) {
                    $(this).css('display', 'flex')
                } else {
                    $(this).hide()
                }
            })
        }
        $('.goods-list img').lazyload({
            threshold: 300
        })
    }

    $('.child-server-select').on('click', 'span', function () {
        if ($(this).hasClass('active')) {
            return false;
        }
        $(this).addClass('active').siblings('span').removeClass('active')
        var text = $(this).text()
        var id = $(this).parents('.child-server').attr('data-id')
        letterSelect(id, text)
    })

    // 滚动加载分页
    var currentPage = 1;
    var pageFlag = false;
    var searchFlag = false;
    $(window).scroll(function () {
        if ($('.goods-list ul li').length < 30) {
            return false;
        }
        if (pageFlag) {
            return false;
        }
        if ($(window).scrollTop() + window.screen.height >= $(document).height() - $('.site-info').outerHeight(true) - $('.footer').outerHeight(true) - 800) {
            currentPage++;
            var cate_id = 0;
            var server_id = $('.server.device-server ul.active input').attr('data-id');
            var goods_name = $('.quick-search .input-box input').val()
            if ($('.server.device-server ul.active li.active').length > 0) {
                server_id = $('.server.device-server ul.active li.active').attr('data-id')
            }
            if ($('.child-server.active ul li.active').length > 0) {
                server_id = $('.child-server.active ul li.active').attr('data-id')
            }
            if ($('.parent-cate.active ul li.active').length > 0) {
                cate_id = $('.parent-cate.active ul li.active').attr('data-cate-id')
            }
            if ($('.child-cate.active ul li.active').length > 0) {
                cate_id = $('.child-cate.active ul li.active').attr('data-id')
            }

            if (searchFlag) {
                $.ajax({
                    url: siteUrl + '/goods/goods_ajax',
                    type: 'get',
                    dataType: 'json',
                    data: { template_type: template_name, server_id: server_id, page: currentPage, goods_name: goods_name },
                    beforeSend: function () {
                        pageFlag = true;
                        $('.goods-list img').removeClass('lazy')
                    },
                    success: function (res) {
                        var data = res.data
                        if (data.goods.length > 0) {
                            for (var i = 0; i < data.goods.length; i++) {
                                data.goods[i].max = Math.ceil(2000 / data.goods[i].true_price)
                            }
                        }

                        var html = template('itemHtml', data)
                        $('.goods-list ul').append(html)
                        $('.goods-list img.lazy').lazyload({
                            threshold: 300
                        })
                        selectAttr()
                        goodsPriceCalc()
                        swiperAjax()
                        if (data.goods.length < 30) {
                        } else {
                            pageFlag = false;
                        }
                    }
                })
            } else {
                $.ajax({
                    url: siteUrl + '/goods/goods_ajax',
                    type: 'get',
                    dataType: 'json',
                    data: { template_type: template_name, server_id: server_id, cate_id: cate_id, page: currentPage, goods_name: goods_name },
                    beforeSend: function () {
                        pageFlag = true;
                        $('.goods-list img').removeClass('lazy')
                    },
                    success: function (res) {
                        var data = res.data
                        if (data.goods.length > 0) {
                            for (var i = 0; i < data.goods.length; i++) {
                                data.goods[i].max = Math.ceil(2000 / data.goods[i].true_price)
                            }
                        }

                        var html = template('itemHtml', data)
                        $('.goods-list ul').append(html)
                        $('.goods-list img.lazy').lazyload({
                            threshold: 300
                        })
                        selectAttr()
                        goodsPriceCalc()
                        swiperAjax()
                        if (data.goods.length < 30) {
                        } else {
                            pageFlag = false;
                        }
                    }
                })
            }
        }
    })
    //货币计算
    function goodsPriceCalc() {
        var rate = $('.header .lang-currency>p.curr-name').attr('data-rate')
        var symbol = localStorage["symbol"]
        var goods_price = $('.goods .goods-list .price')
        goods_price.each(function () {
            var lkr = $(this).attr('lkr')
            var num = $(this).parents('.item').find('input').val()
            $(this).find('strong').text(symbol)
            var newLkr = num * lkr
            var price = (newLkr * rate).toFixed(2)
            $(this).find('i').text(price)
        })
    }


    $('.items-list ul').on("mouseover", "li .item-img", function (e) {
        var tips = $(this).find('.item-info').attr('data-tips')
        if (typeof tips != 'undefined') {
            $(this).find('.item-info').html(tips)
        }
        $(this).parents('.item').find('.item-info').addClass('display')
        if (!$(this).find('.item-info').hasClass('display')) {
            e.stopPropagation()
        }
    })
    $('.items-list ul').on("mouseout", "li .item-img", function (e) {
        $(this).find('.item-info').removeClass('display')
    });

    //buy Now
    $('.goods-list').on('click', '.buy-now', function () {
        var that = $(this)
        addCart(that)
        window.location.href = siteUrl + '/cart'
    })

    // add cart
    var timeOutList
    $('.goods-list').on('click', '.add-cart', function () {
        clearTimeout(timeOutList)
        var that = $(this)
        addCart(that)
        $('.cart .cart-link').addClass('display')
        timeOutList = setTimeout(function () {
            $('.cart .cart-link').removeClass('display')
        }, 2000)
    })

    $('.right .cart').hover(function () {
        clearTimeout(timeOutList)
    })

    function addCart(that) {
        $.cookie('game_sku', goods_game_sku)
        if ($('.server.device-server ul.active input').length > 0) {
            var device_type = $('.server.device-server ul.active input').val()
        } else {
            var device_type = $('.server_c ul.active input').val()
        }
        if (localStorage['cart'] && localStorage['cart'] != '') {
            if (device_type != localStorage['cate_type']) {
                localStorage.removeItem('cart')
            }
        }

        if (template_name == 'boosting') {
            if ($('.tbc-reputations').length == 0) {
                localStorage.removeItem('cart')
            }
        }

        var shopCart;
        if (localStorage['cart'] && localStorage['cart'] != '') {
            //存在
            datas = localStorage['cart']
            shopCart = JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("cart"))))
        } else {
            //不存在
            shopCart = {}
            shopCart.list = []
        }
        var goods = {}
        var type = 0
        if (template_name == 'golds') {  //金币加入购物车
            for (var i = 0; i < shopCart.list.length; i++) {
                if (shopCart.list[i].price_num == that.parents('li.item').attr('data-num') && shopCart.list[i].goods_id == that.parents('li.item').attr('data-id')) {
                    type++
                    shopCart.list[i].num = parseFloat(shopCart.list[i].num) + parseFloat(that.parents('li.item').find('.item-num input').val())
                    break;
                }
            }
            if (type == 0) {
                if(goods_game_sku == 'newworldgold253') {
                    goods.server = $('.server.device-server ul.active li.active span').text()
                    goods.childServer = $('.child-server.active ul li.active p').text()
                }
                goods.goods_no = good_rules.goods_no
                goods.goods_id = that.parents('li.item').attr('data-id')
                goods.num = that.parents('li.item').find('.item-num input').val()
                goods.price_num = that.parents('li.item').attr('data-num')
                goods.step = that.parents('li.item').find('.item-num input').attr('data-num')
                if (that.parents('li.item').attr('data-give') > 0) {
                    goods.title = that.parents('li.item').find('.item-title span').text() + ' + ' + that.parents('li.item').attr('data-give') + that.parents('li.item').find('.golds-unit i').text()
                    goods.give = that.parents('li.item').attr('data-give')
                } else {
                    goods.title = that.parents('li.item').find('.item-title').text()
                }
                goods.img = that.parents('li.item').find('.item-img img').attr('data-original')
                goods.price = that.parents('li.item').find('.item-price .price').attr('lkr')
                goods.game_sku = goods_game_sku
                goods.max_num = 99999
                if (parseFloat(goods.num) == 0 || goods.num == '') {
                    return false;
                }
                shopCart.list.unshift(goods)
            }
        } else if (template_name == 'items') {  //物品加入购物车
            for (var i = 0; i < shopCart.list.length; i++) {
                if (shopCart.list[i].goods_no == that.parents('li.item').attr('data-id')) {
                    type++
                    if (parseFloat(shopCart.list[i].num) + parseFloat(that.parents('li.item').find('.item-num input').val()) < that.parents('li.item').find('.item-num input').attr('max')) {
                        shopCart.list[i].num = parseFloat(shopCart.list[i].num) + parseFloat(that.parents('li.item').find('.item-num input').val())
                    } else {
                        shopCart.list[i].num = that.parents('li.item').find('.item-num input').attr('max')
                    }
                    break;
                }
            }
            if($('.quick-search input').val().trim() == '') {
                var serverTitle = $('.goods .goods-header h2 p').text()
            }else {
                var serverTitle = $('.device-server.server ul.active li.active span').text()
            }
            if (type == 0) {
                if(goods_game_sku == 'newworldgold253') {
                    goods.server = $('.server.device-server ul.active li.active span').text()
                    goods.childServer = $('.child-server.active ul li.active p').text()
                }
                goods.goods_no = that.parents('li.item').attr('data-id')
                goods.num = that.parents('li.item').find('.item-num input').val()
                goods.step = that.parents('li.item').find('.item-num input').attr('data-num')
                goods.max_num = that.parents('li.item').find('.item-num input').attr('max')
                goods.title = serverTitle + ' ' + that.parents('li.item').find('.item-title').text()
                goods.img = that.parents('li.item').find('.item-img img').attr('data-original')
                goods.price = that.parents('li.item').find('.item-price .price').attr('lkr')
                goods.game_sku = goods_game_sku
                if (parseFloat(goods.num) == 0 || goods.num == '') {
                    return false;
                }
                shopCart.list.unshift(goods)
            }
        } else if (template_name == 'boosting') {
            if ($('.falloutBoosting').length > 0) {
                goods.fallout = 'boosting'
                goods.device = $('.device-server ul li.active span').text()
            }
            goods.goods_no = $('.boosting_main .item-amount').attr('data-id')
            goods.num = 1
            goods.max_num = 1
            goods.title = $('.boosting_main .item-amount').attr('data-title')
            goods.min_level = $('.boosting_main .item-level .level-1 input').val()
            goods.max_level = $('.boosting_main .item-level .level-3 input').val()
            let remarkTitle = {}
            if ($('.boosting_main .item-speed li.active').length > 0 && $('.boosting_main .item-speed li.active').attr('data-discount') != '1') {
                let speed = {
                    price: $('.boosting_main .item-speed li.active .price').attr('lkr'),
                    title: $('.boosting_main .item-speed li.active div').text()
                }
                remarkTitle.speed = speed
            }
            if ($('.poeBoosting').length > 0 || $('.newworldBoosting').length > 0) {
                if (!$('.boosting_main .item-option').hasClass('hide') && $('.boosting_main .item-option li.active').length > 0) {
                    let remark = []
                    $('.item-option li.active').each(function () {
                        let remarkObj = {
                            price: $(this).find('.price').attr('lkr'),
                            title: $(this).find('p').text()
                        }
                        remark.push(remarkObj)
                    })
                    remarkTitle.remark = remark
                }
                goods.remarkTitle = remarkTitle
                goods.league = $('.item-leagues ul li.active').text()
                goods.boostingType = 'poe'
            } else {
                if ($('.boosting_main .item-option li.active').length > 0) {
                    let remark = []
                    $('.item-option li.active').each(function () {
                        let remarkObj = {
                            price: $(this).find('.price').attr('lkr'),
                            title: $(this).find('p').text()
                        }
                        remark.push(remarkObj)
                    })
                    remarkTitle.remark = remark
                }
                goods.remarkTitle = remarkTitle
            }
            if ($('.orb_content_left .list-title').text() == 'WOW Classic TBC Reputations') {
                goods.reputations = 'tbc'
                if ($('.itemBox .item-choose').hasClass('display')) {
                    var chooseArr = []
                    $('.itemBox .item-choose li.active').each(function () {
                        chooseArr.push($(this).find('p').text())
                    })
                    goods.choose = chooseArr
                }
            }

            if($('.newworldBoosting').length > 0) {
                goods.faction = $('.item-faction button span').text()
                goods.new_server = {
                    id:$('.server_c ul.active li.active').attr('data-id'),
                    title:$('.server_c ul.active li.active').text()
                }
            }

            goods.cate_id = $('.boosting_main .server_c ul.active li.active').attr('data-id')
            goods.price = $('.boosting_main .c_orb_price .item-price .price').attr('lkr')
            goods.game_sku = goods_game_sku
            goods.img = $('.boosting_main .chaosorbGoods .item-img img').attr('src')
            shopCart.list.unshift(goods)
        }
        if (shopCart.list.length == 1) {
            $('.header .cart .cart-total em').hide()
        } else {
            $('.header .cart .cart-total em').show()
        }
        $('.header .cart .item-num').text(shopCart.list.length)
        $('.header .cart .cart_num').text(shopCart.list.length)
        let html = template('headerCart', shopCart)
        $('#headerCarts').html(html)
        $('.cart .cart-link .noCart').hide()
        $('.cart .cart-link .cart-total').show()
        $('.cart .cart-link .cart-button').show()
        var lkrprice = 0;
        for (var i = 0; i < shopCart.list.length; i++) {
            lkrprice = lkrprice + (shopCart.list[i].num * shopCart.list[i].price)
        }
        $('.header .cart .cart-link .cart-total .price').attr('lkr', lkrprice)
        priceCalc()
        localStorage['cart'] = window.btoa(window.encodeURIComponent(JSON.stringify(shopCart)))
        if ($('.server.device-server ul.active input').length > 0) {
            localStorage['cate_type'] = $('.server.device-server ul.active input').val()
        } else {
            localStorage['cate_type'] = $('.server_c ul.active input').val()
        }
    }

    //头部购物车页价格计算
    function priceCalc() {
        var rate = $('.header .lang-currency>p.curr-name').attr('data-rate')
        var symbol = localStorage["symbol"]
        //计算出美元
        var Cartprice = $('.cart .cart-link .price')
        Cartprice.each(function () {
            $(this).find('strong').text(symbol)
            var lkr = $(this).attr('lkr')
            var price = (lkr * rate).toFixed(2)
            $(this).find('i').text(price)
        })
    }

    //添加商品数量
    $('.goods-list').on('click', 'li.item .item-num .sub', function () {
        var val = $(this).siblings('input').val()
        var min_num = $(this).siblings('input').attr('data-num')
        var length = min_num.length
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
        calcPrice(that, newsVal)
    })

    $('.goods-list').on('click', 'li.item .item-num .add', function () {
        var val = $(this).siblings('input').val()
        var min_num = $(this).siblings('input').attr('data-num')
        var max = $(this).siblings('input').attr('max')
        var length = min_num.length
        var that = $(this)
        if (parseFloat(val) >= parseFloat(max)) {
            var newsVal = parseFloat(max)
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
        calcPrice(that, newsVal)
    })

    //输入框
    $('.goods-list').on('blur', 'li.item .item-num input', function () {
        var val = $(this).val()
        var max = $(this).attr('max')
        if (val >= parseFloat(max)) {
            val = parseFloat(max)
            $(this).val(val)
        }
        var min_num = $(this).attr('data-num')
        var that = $(this)
        if (val == '' || parseFloat(val) < min_num) {
            val = min_num
            $(this).val(val)
        }
        calcPrice(that, val)
    })

    //计算商品价格
    function calcPrice(that, num) {
        var prices = that.parents('.item').find('.price')
        var rate = localStorage['rate']
        prices.each(function () {
            var lkr = $(this).attr('lkr')
            var newLkr = (num * lkr)
            var newsPrice = (newLkr * rate).toFixed(2)
            $(this).find('i').text(newsPrice)
        })
    }

    //输入框
    $('.quick-search .count input').on('input', function () {
        if (typeof good_rules == 'undefined' || good_rules.length == 0) {
            return false;
        }
        var val = $(this).val()
        if (isNaN(val)) {
        } else {
            if (parseFloat(val) > maxNum) {
                $(this).val(maxNum)
                priceQuick(maxNum)
            } else if (parseFloat(val) < minNum || val == '') {
                $('.quick-search .price').attr('lkr', 0)
                $('.quick-search .price i').text(0.00)
            } else {
                priceQuick(val)
            }
        }
    })
    $('.quick-search .count input').blur(function () {
        if (typeof good_rules == 'undefined' || good_rules.length == 0) {
            return false;
        }
        var val = $(this).val()
        if (parseFloat(val) > maxNum) {
            val = maxNum
        }
        if (parseFloat(val) < minNum || val == '') {
            val = minNum
        } else {

        }
        $(this).val(val)
        priceQuick(val)
    })

    $('.quick-search button').click(function () {
        if (typeof good_rules == 'undefined' || good_rules.length == 0) {
            return false;
        }
        var value = $(this).siblings('.count').find('input').val()
        var device_type = $('.server.device-server ul.active input').val()
        if (localStorage['cart'] && localStorage['cart'] != '') {
            if (device_type != localStorage['cate_type']) {
                localStorage.removeItem('cart')
            }
        }
        var shopCart;
        if (localStorage['cart'] && localStorage['cart'] != '') {
            //存在
            datas = localStorage['cart']
            shopCart = JSON.parse(decodeURIComponent(window.atob(localStorage.getItem("cart"))))
        } else {
            //不存在
            shopCart = {}
            shopCart.list = []
        }
        var goods = {}
        if (good_rules.unit == '') {
            var unit = '';
        } else {
            unit = good_rules.unit
        }
        goods.goods_no = good_rules.goods_no
        goods.num = 1
        goods.step = $(this).siblings('.count').find('input').attr('data-num')
        goods.give = $(this).siblings('.count').find('input').attr('data-give')
        if($(this).siblings('.count').find('input').attr('data-give') > 0) {
            goods.title = good_rules.title + ' ' + value + unit + ' + ' + $(this).siblings('.count').find('input').attr('data-give') + unit
        }else {
            goods.title = good_rules.title + ' ' + value + unit
        }
        goods.img = good_rules.images;
        goods.price = $(this).siblings('.price').attr('lkr')
        goods.price_num = value
        goods.game_sku = goods_game_sku
        shopCart.list.unshift(goods)
        localStorage['cart_num'] = shopCart.list.length
        $('.header .cart .cart_num').text(shopCart.list.length)
        localStorage['cart'] = window.btoa(window.encodeURIComponent(JSON.stringify(shopCart)))
        localStorage['cate_type'] = device_type
        window.location.href = siteUrl + '/cart'
    })

    if (typeof good_rules != 'undefined' && template_name == 'golds') {
        var quickPrice, minNum, maxNum, ruleArray
        quickGoodsRule()
    } else {
        $('.quick-search .price').attr('lkr', 0)
        $('.quick-search .count input').attr('disabled', true)
    }

    function quickGoodsRule() {
        quickPrice = good_rules.price
        ruleArray = good_rules.rule
        minNum = ruleArray[0][0]
        maxNum = ruleArray[ruleArray.length - 1][0]
        $('.quick-search input').val(minNum)
        if (minNum.length >= 3) {
            var step = 100;
        } else if (minNum.length == 2) {
            var step = 10;
        } else {
            var step = 1;
        }
        $('.quick-search input').attr('data-num', 1)
        $('.quick-search input').attr('step', step)
        priceQuick(minNum)
    }

    function priceQuick(num) {
        var rate = localStorage['rate']
        var discount = 1;
        var give = 0;
        for (var i = 0; i < ruleArray.length; i++) {
            if (num == ruleArray[i][0]) {
                discount = (100 - ruleArray[i][2]) / 100
                give = ruleArray[i][1]
                continue;
            }
            if (parseFloat(num) > ruleArray[i][0] && parseFloat(num) < ruleArray[i + 1][0]) {
                discount = (100 - ruleArray[i][2]) / 100
                give = ruleArray[i][1]
                continue;
            }
        }
        var lkr = parseFloat(num * quickPrice * discount);
        $('.quick-search .price').attr('lkr', lkr)
        $('.quick-search input').attr('data-give', give)
        $('.quick-search .price i').text(parseFloat(lkr * rate).toFixed(2))
    }


    // 搜索商品
    $('.item-quick-search input').on('keydown', function (e) {
        if (e.which == 13) {
            $('.goods-list .noDataTips').hide()
            $('.goods-list ul').html('')
            $('.spinner').show()
            searchGoods()
        }
    })

    $('.item-quick-search .input-box .ico').on('click', function () {
        $('.goods-list .noDataTips').hide()
        $('.goods-list ul').html('')
        $('.spinner').show()
        searchGoods()
    })

    function searchGoods() {
        var goods_name = $('.item-quick-search input').val().trim();
        if (goods_name != '') {
            searchFlag = true
        } else {
            searchFlag = false
        }
        currentPage = 1;
        var server_id = $('.server.device-server ul.active input').attr('data-id');
        var goods_name = $('.quick-search .input-box input').val()
        if ($('.server.device-server ul.active li.active').length > 0) {
            server_id = $('.server.device-server ul.active li.active').attr('data-id')
        }
        if ($('.child-server.active ul li.active').length > 0) {
            server_id = $('.child-server.active ul li.active').attr('data-id')
        }
        $.ajax({
            url: siteUrl + '/goods/goods_ajax',
            type: 'get',
            dataType: 'json',
            data: { template_type: template_name, server_id: server_id, page: currentPage, goods_name: goods_name },
            beforeSend: function () {
                pageFlag = true;
                $('.goods-list img').removeClass('lazy')
            },
            success: function (res) {
                $('.spinner').hide()
                var data = res.data
                if (data.goods.length == 0) {
                    $('.goods-list .noDataTips').show()
                } else {
                    for (var i = 0; i < data.goods.length; i++) {
                        data.goods[i].max = Math.ceil(2000 / data.goods[i].true_price)
                    }
                }
                var html = template('itemHtml', data)
                $('.goods-list ul').html(html)
                $('.goods-list img.lazy').lazyload({
                    threshold: 300
                })
                selectAttr()
                goodsPriceCalc()
                swiperAjax()

                if (data.goods.length < 30) {
                } else {
                    pageFlag = false;
                }
            }
        })
    }



    //物品大图方法
    $('.items-list ul').on("mouseover", "li .item-img", function (e) {
        var img = $(this).find('img').attr('data-src')
        if ($(this).find('.bigImage').find('img').attr('src') != img) {
            $(this).find('.bigImage').find('img').attr('src', img)
        }
        $(this).find('.bigImage').addClass('display')
        if (!$(this).find('.bigImage').hasClass('display')) {
            e.stopPropagation()
        }
    });

    $('.items-list ul').on("mouseout", "li .item-img", function (e) {
        $(this).find('.bigImage').removeClass('display')
    });


    // 动森切换图片
    $('.attrItems-list').on('click', '.swiper-slide a', function () {
        $(this).addClass('active').parents('.swiper-slide').siblings('.swiper-slide').find('a').removeClass('active')
        $(this).parents('.item').find('.item-img img').attr('src', $(this).find('img').attr('bigsrc'))
        $(this).parents('.item').find('.item-img img').attr('data-original', $(this).find('img').attr('bigsrc'))
        $(this).parents('.item').find('.item-price .price').attr('lkr', $(this).attr('true-price'))
        $(this).parents('.item').find('.old-price .price').attr('lkr', $(this).attr('old-price'))
        $(this).parents('.item').find('item-discount').text($(this).attr('discount') + '%')
        $(this).parents('.item').attr('data-id', $(this).attr('data-goods'))
        var that = $(this)
        var num = $(this).parents('.item').find('input').val()
        calcPrice(that, num)
        var text = $(this).attr('data-attribute')
        $(this).parents('li.item').find('.item-title span').text(' - ' + text)
    })

    selectAttr()
    function selectAttr() {
        var goodsList = $('.goods-list ul li')
        goodsList.each(function () {
            var text = $(this).find('.swiper-slide a').attr('data-attribute')
            if (typeof text != 'undefined') {
                $(this).find('.item-title span').text(' - ' + text)
            }
        })
    }


    swiperAjax()
    function swiperAjax() {
        var goodSwiper = $('.attrItems-list li.item')
        for (var i = 0; i < goodSwiper.length; i++) {
            var id = $(goodSwiper[i]).attr('id')
            new Swiper('.swiper' + id + ' .attrItemSwiper', {
                autoplay: false,
                slidesPerView: 'auto',
                navigation: {
                    nextEl: ".swiper" + id + " .swiper-button-next",
                    prevEl: ".swiper" + id + " .swiper-button-prev",
                },
            })
        }
    }
})
