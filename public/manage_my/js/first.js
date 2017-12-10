$(function () {
    var myPage = 1;
    var myPageNum = 5;

    function init(myPage, myPageNum) {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: myPage,
                pageSize: myPageNum
            },
            success: function (data) {
                console.log(data)
                var result = template('tableTMP', data)
                $('.table-add tbody').html(result)
            }
        })
    }
    init(myPage, myPageNum)

    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '分类不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                    },
                }
            }
        }

    }).on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: $('form').serialize(),
            success: function (data) {
                console.log(data)
                $('.modal-add').modal('hide')
                init(myPage,myPageNum)
                // $('.form-control').val('')
            }
        })
    });
})