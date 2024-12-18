// const { error } = require("laravel-mix/src/Log");

$(document).ready(function () {
  $("button.phong").on("click", function (event) {
    alert('phongllll');
  });
  $("button#playAudio").on("click", function (event) {
    alert('phongllll');
  });
  var btn_close_success = '<span class="ntp_alert_close bg-success"><button type="button" class="btn-close"></button></span>';
  var btn_close_danger = '<span class="ntp_alert_close bg-danger"><button type="button" class="btn-close"></button></span>';
  var load = '<div class="spinner-border spinner-border-sm me-2 text-light" role="status"><span class="visually-hidden">Loading...</span></div>';

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  $('.ntp_slick').slick({
    verticalSwiping: true,
    vertical: true,
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  $('.ntp_recommend').slick({
    centerMode: true,
    centerPadding: '200px',
    slidesToShow: 1,
    // autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: '50px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: '0px',
          slidesToShow: 1
        }
      }
    ]
  });

  // comment
  $('body').on('click','.ntp_submit_comment',function() {
    var formdata = $('#ntp_rating_form')[0];
    var _data = new FormData(formdata);
    var _form = $('#ntp_rating_form');
    var _this = $(this);
    $(_this).append(load);

    $.ajax({
      method: "POST",
      url: $(_form).attr('action'),
      contentType: false,
      processData: false,
      data: _data,
      dataType: "json",

      success: function (data) {
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
          $(formdata)[0].reset();
          $('.ntp_novel_rating .rating-start').removeClass('fa-solid').addClass('far');
          $('body').trigger('ntp_novel_review');
        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $(_this).find('.spinner-border').remove();
        
        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {
        $(_this).find('.spinner-border').remove();
      }
    });
  });

  // gán link
  $('body').on('click', '.ntp_comment_reply', function () {
    var _form = $('#ntp_rating_reply_form');
    $(_form).attr('action',$(this).attr('data-link'));
  });

  $('body').on('click', '.ntp_comment_update', function () {
    var _form = $('#ntp_update_rating_reply_form');
    var content = $(this).parents('.comment_item').find('p.comment_content').text().trim();
    $(_form).attr('action',$(this).attr('data-link'));
    $(_form).find('textarea[name="ntp_comment_update"]').text(content);
  });
  // phản hồi đánh giá
    $('body').on('click','.ntp_comment_reply_submit',function() {
    var formdata = $('#ntp_rating_reply_form')[0];
    var _data = new FormData(formdata);
    var _form = $('#ntp_rating_reply_form');
    var _this = $(this);
    $(_this).append(load);

    $.ajax({
      method: "POST",
      url: $(_form).attr('action'),
      contentType: false,
      processData: false,
      data: _data,
      dataType: "json",

      success: function (data) {
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
          $(formdata)[0].reset();
          $('.ntp_novel_rating .rating-start').removeClass('fa-solid').addClass('far');
          $('body').trigger('ntp_novel_review');
          $(_this).parents('.modal').find('.btn-close').trigger('click')
        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $(_this).find('.spinner-border').remove();
        
        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {
        $(_this).find('.spinner-border').remove();
      }
    });
  });

  // cập nhật phản hồi đánh giá
  $('body').on('click','.ntp_update_comment_reply_submit',function() {
    var formdata = $('#ntp_update_rating_reply_form')[0];
    var _data = new FormData(formdata);
    var _form = $('#ntp_update_rating_reply_form');
    var _this = $(this);
    $(_this).append(load);

    $.ajax({
      method: "POST",
      url: $(_form).attr('action'),
      contentType: false,
      processData: false,
      data: _data,
      dataType: "json",

      success: function (data) {
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
          $(formdata)[0].reset();
          $('.ntp_novel_rating .rating-start').removeClass('fa-solid').addClass('far');
          $('body').trigger('ntp_novel_review');
          $(_this).parents('.modal').find('.btn-close').trigger('click')
        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $(_this).find('.spinner-border').remove();
        
        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {
        $(_this).find('.spinner-border').remove();
      }
    });
  });

  // cho điểm
  $('body').on('click', '.ntp_novel_rating .rating-start', function () {
    var clickedPoint = $(this).data('point');
    var input = $('.rating_start_input');

    $('.rating-start').each(function() {
        if ($(this).data('point') <= clickedPoint) {
            $(this).addClass('fa-solid').removeClass('far');
        } else {
            $(this).removeClass('fa-solid').addClass('far');
        }
    });

    $(input).val($(this).data('point'));

  });

  // ẩn/gỡ bình luận đánh giá
  $('body').on('click', '.ntp_show_hide_comment,.ntp_delete_comment', function () {
    var url = $(this).attr('data-link');
    var value = $(this).attr('data-value');
    var id_comment = $(this).attr('data-id-comment');
    var data = {
      value: value,
      id_comment:id_comment
    };
    var text = 'Bạn có chắc muốn thay đổi trạng thái của bình luận này?';

    if ($(this).hasClass('ntp_show_hide_comment')) {
      var text = value == 0 ? 'Bạn có chắc muốn ẩn bình luận này?' : 'Bạn có chắc muốn hiển thị bình luận này?';
    } else {
      var text = value == 0 ? 'Bạn có chắc muốn khôi phục bình luận này?' : 'Bạn có chắc muốn gỡ bình luận này?';
    }

    var confirmAction = confirm(text);
    if (confirmAction) {
      $.ajax({
        method: "POST",
        url: url,
        dataType: "json",
        contentType: 'application/json', 
        data: JSON.stringify(data), 

        success: function (data) {
          if (data.status == 1) {
            $('.alert-danger.ntp_alert_public').fadeOut(200);
            $('.alert-success.ntp_alert_public').fadeIn(200).html(data.message + btn_close_success);
            $('body').trigger('ntp_novel_review');
          } else if (data.status == 0) {
            $('.alert-success.ntp_alert_public').fadeOut(200);

            var errors = data.errors;
            var errorMessages = '';
            for (var key in errors) {
              errorMessages += errors[key] + '</br>';
            }
            $('.alert-danger.ntp_alert_public').fadeIn(200).html(errorMessages + btn_close_danger);
          }
          
          $('body').trigger('ntp-alert-out');
        },
        error: function (error) {
        }
      });
    }

  });
  // Load lại review
  $('body').on('ntp_novel_review', function () {
    var ntp_novel_review = $('#ntp_novel_review');
    if ($(ntp_novel_review).length) {
      var url = $(ntp_novel_review).attr('data-link');
      $.ajax({
        method: "Get",
        url: url,
        success: function (data) {
          
          $(ntp_novel_review).replaceWith(data.html);
        },
        error: function (error) {
  
        }
      });
    }
  });

  //report 

  $('body').on('click','.ntp_btn_report',function() {
    var formdata = $('#ntp_form_user_report')[0];
    var _data = new FormData(formdata);
    var _form = $('#ntp_form_user_report');
    var _this = $(this);
    $(_this).append(load);

    $.ajax({
      method: "POST",
      url: $(_form).attr('action'),
      contentType: false,
      processData: false,
      data: _data,
      dataType: "json",

      success: function (data) {
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
          $(formdata)[0].reset();
        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $(_this).find('.spinner-border').remove();
        
        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {
        $(_this).find('.spinner-border').remove();
      }
    });
  });
  //report update
  $('body').on('click','.ntp_report_detail_update',function() {
    var _form = $('#ntp_form_user_report_update');

    if($(_form).length) {
      var formdata = $('#ntp_form_user_report_update')[0];
      var _data = new FormData(formdata);

      $.ajax({
        method: "POST",
        url: $(_form).attr('action'),
        contentType: false,
        processData: false,
        data: _data,
        dataType: "json",
  
        success: function (data) {
          if (data.status == 1) {
            $(_form).find('.alert-danger').fadeOut(200);
            $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
  
          } else if (data.status == 0) {
            $(_form).find('.alert-success').fadeOut(200);
  
            var errors = data.errors;
            var errorMessages = '';
            for (var key in errors) {
              errorMessages += errors[key] + '</br>';
            }
            $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
          }
  
          $('body').trigger('ntp-alert-out');
        },
        error: function (error) {
  
        }
      });
    }
  });

// load lai bao cao ca nhan
  $('body').on('click','#user_report_list-tab',function() {
    var _this = $(this)
    var url = $(_this).attr('data-link');
    $.ajax({
      method: "Get",
      url: url,
      success: function (data) {
        var user_report_list = $('#user_report_list');
        $(user_report_list).find('.user_reports').html(data.html);
      },
      error: function (error) {

      }
    });
  });

// load lai bao cao cao admin
  $('body').on('click','.xu_ly_bao_cao_tab',function() {
    var _this = $(this)
    var url = $(_this).attr('data-link');
    $.ajax({
      method: "Get",
      url: url,
      success: function (data) {
        var xu_ly_bao_cao = $((_this).attr('data-bs-target'));
        $(xu_ly_bao_cao).html(data.html);
      },
      error: function (error) {

      }
    });
  });

  $('body').on('click','.ntp_report_admin_detail_update',function() {
    var _form = $('#ntp_form_admin_report_update');

    if($(_form).length) {
      var formdata = $('#ntp_form_admin_report_update')[0];
      var _data = new FormData(formdata);

      $.ajax({
        method: "POST",
        url: $(_form).attr('action'),
        contentType: false,
        processData: false,
        data: _data,
        dataType: "json",
  
        success: function (data) {
          if (data.status == 1) {
            $(_form).find('.alert-danger').fadeOut(200);
            $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
            $('.xu_ly_bao_cao_tab.active').trigger('click');
          } else if (data.status == 0) {
            $(_form).find('.alert-success').fadeOut(200);
  
            var errors = data.errors;
            var errorMessages = '';
            for (var key in errors) {
              errorMessages += errors[key] + '</br>';
            }
            $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
          }
  
          $('body').trigger('ntp-alert-out');
        },
        error: function (error) {
  
        }
      });
    }
  });
  

  // load thông tin chi tiết của tố cáo
  $('body').on('click', '.ntp_btn_report_detail_user', function () {
    var _this = $(this)
    var url = $(_this).attr('data-link');
    $.ajax({
      method: "Get",
      url: url,
      success: function (data) {
        var ntp_report_detail = $('.ntp_report_detail');
        $(ntp_report_detail).find('.modal-body').html(data.html);
        $(ntp_report_detail).find('.modal-title').html(data.report_title);

        if($('.xu_ly_bao_cao_tab').length <= 0) {
          if (data.report_status != 0) {
            $(ntp_report_detail).find('.modal-footer').hide();
          } else {
             $(ntp_report_detail).find('.modal-footer').show();
          }
        }

      },
      error: function (error) {

      }
    });
  });

  //Hủy yêu cầu rút tiền
  $('body').on('click', '.btn_cancel_withdraw', function () {
    var url = $(this).attr('data-link');

    var text = 'Bạn có chắc muốn hủy yêu cầu này?';

    var confirmAction = confirm(text);

    if (confirmAction) {
      $.ajax({
        method: "POST",
        url: url,
        dataType: "json",
        contentType: 'application/json', 

        success: function (data) {
          if (data.status == 1) {
            $('.alert-danger.ntp_alert_public').fadeOut(200);
            $('.alert-success.ntp_alert_public').fadeIn(200).html(data.message + btn_close_success);

            setTimeout(function () {
              location.reload();
            }, 1000);
          } else if (data.status == 0) {
            $('.alert-success.ntp_alert_public').fadeOut(200);

            var errors = data.errors;
            var errorMessages = '';
            for (var key in errors) {
              errorMessages += errors[key] + '</br>';
            }
            $('.alert-danger.ntp_alert_public').fadeIn(200).html(errorMessages + btn_close_danger);
          }

          
          $('body').trigger('ntp-alert-out');
        },
        error: function (error) {
        }
      });
    }

  });
  // tạo yêu cầu rút tiền
 $('body').on('click','.ntp_btn_author_withdraw',function() {
    var _this = $(this);
    var formdata = $('#author_withdraw_form')[0];
    var _data = new FormData(formdata);
    var _form = $('#author_withdraw_form');
   
    $(_this).append(load);
    var target = $(_this).attr('target');

    $.ajax({
      method: "POST",
      url: $(_form).attr('action'),
      contentType: false,
      processData: false,
      data: _data,
      dataType: "json",

      success: function (data) {
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
          setTimeout(function () {
            location.reload();
          }, 1000);
        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $(_this).find('.spinner-border').remove();
        
        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {
        $(_this).find('.spinner-border').remove();
      }
    });
  });

  //Tải báo cáo thông kê
  $('body').on('click','.downloadReport', function() {
    if (window.pdfBase64 && window.pdfFileName) {
        var binary = atob(window.pdfBase64);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        var blob = new Blob([new Uint8Array(array)], { type: 'application/pdf' });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = window.pdfFileName;
        link.click();
    } else {
        alert('Chưa có báo cáo để tải xuống.');
    }
});

  // Tạo báo cáo thống kê
  $('body').on('click','.btn_get_thongke',function() {
    var _this = $(this);
    var formdata = $($(_this).attr('data-form'))[0];
    var _data = new FormData(formdata);
    var _form = $($(_this).attr('data-form'));
    $(_this).append(load);
    var target = $(_this).attr('target');
    $(target).find('.downloadReport').addClass('ntp_hidden');

    $.ajax({
      method: "POST",
      url: $(_form).attr('action'),
      contentType: false,
      processData: false,
      data: _data,
      dataType: "json",

      success: function (data) {
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
          $(target).html(data.html);

          window.pdfBase64 = data.pdfBase64;
          window.pdfFileName = data.pdfFileName;

          $('.downloadReport').removeClass('ntp_hidden');

        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $(_this).find('.spinner-border').remove();
        
        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {
        $(_this).find('.spinner-border').remove();
      }
    });
  });

  // tạo mới thể loại trong admin

  $('button.ntp_btn_cat_create').on('click', function () {
    var form = $('.ntp_cat_create')[0];
    var _data = new FormData(form);
    var _form = $('.ntp_cat_create');

    $.ajax({
      method: "POST",
      url: $(form).attr('action'),
      contentType: false,
      processData: false,
      data: _data,
      dataType: "json",

      success: function (data) {
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);

        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {

      }
    });

  });

  // load thông tin chi tiết của thể loại

  $('body').on('click', '.ntp_cat_edit', function () {
    var _this = $(this)
    var url = $(_this).attr('data-link');
    $.ajax({
      method: "Get",
      url: url,
      success: function (data) {
        var ntp_efit_popup = $('.ntp_edit_cat_ppoup');
        $(ntp_efit_popup).find('.modal-body').html(data);
      },
      error: function (error) {

      }
    });
  });


  // cập nhật thể loại trong admin
  $('body').on('click', '.ntp_edit_cat_ppoup .ntp_btn_update_cat', function () {
    var _this = $(this)
    var pa = $(_this).parents('.ntp_edit_cat_ppoup');
    var _form = $(pa).find('.modal-body form');
    var url = $(_form).attr('action');
    var dataform = $(pa).find('.modal-body form')[0];
    var _data = new FormData(dataform);

    $.ajax({
      method: "POST",
      url: url,
      data: _data,
      contentType: false,
      processData: false,
      success: function (data) {
        $('body').trigger('ntp_admin_load_cat_list');
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);

        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {

      }
    });
  });

  // Load lại danh sách thể loại trong admin

  $('#danh_sach_theloai-tab').on('click', function () {
    $('body').trigger('ntp_admin_load_cat_list');
  })
  // Load lại danh sách thể loại trong admin
  $('body').on('ntp_admin_load_cat_list', function () {
    var btn = $('#danh_sach_theloai-tab');

    if ($(btn).length) {
      var url = $(btn).attr('data-link');

      $.ajax({
        method: "get",
        url: url,
        success: function (data) {
          var danh_sach_theloai = $('#danh_sach_theloai');
          $(danh_sach_theloai).html(data);
        },
        error: function (error) {

        }
      });
    }
  }).trigger('ntp_admin_load_cat_list');


  // đăng nhập
  $("#ntp_login_form .ntp_submit_login").on("click", function () {
    var _this = $(this)
    var pa = $(_this).parents('#ntp_login_register_modal');
    var _form = $(pa).find('#ntp_login_form');
    var url = $(_form).attr('action');
    var dataform = $(pa).find('#ntp_login_form')[0];
    var _data = new FormData(dataform);

    $.ajax({
      method: "POST",
      url: url,
      data: _data,
      Accept: 'application/json',
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {

        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
          setTimeout(function () {
            location.reload();
          }, 400);

        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {

      }
    });
  });


  // đăng ký
  $("#ntp_register_form .ntp_submit_register").on("click", function () {
    var _this = $(this)
    var pa = $(_this).parents('#ntp_login_register_modal');
    var _form = $(pa).find('#ntp_register_form');
    var url = $(_form).attr('action');
    var dataform = $(pa).find('#ntp_register_form')[0];
    var _data = new FormData(dataform);

    $.ajax({
      method: "POST",
      url: url,
      data: _data,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        console.log(data);
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
          setTimeout(function () {
            location.reload();
          }, 2000);
        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {

      }
    });
  });

  // ntp_form_update_infor_user 
  $(".ntp_btn_update_infor_user").on("click", function (event) {
    var _this = $(this);
    var _form = $(_this).parents('#ntp_form_update_infor_user');
    var dataform = $(_this).parents('#ntp_form_update_infor_user')[0];
    var _data = new FormData(dataform);

    var url = $(_form).attr('action');

    $.ajax({
      method: "POST",
      url: url,
      data: _data,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        console.log(data);
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
          // setTimeout(function() {
          //   location.reload();
          // }, 2000);
        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {

      }
    });
    event.preventDefault();
  });

  //thay avartar
  $('body').on('change', '#ntp_input_update_anhdaidien', function () {
    var fileInput = $(this)[0];
    var file = fileInput.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.ntp_av_wrap .ntp_av ').attr('src', e.target.result);
      }

      reader.readAsDataURL(file);
      var _this = $(this);
      var _form = $(_this).parents('#ntp_form_update_av_user');
      var dataform = $(_this).parents('#ntp_form_update_av_user')[0];
      var _data = new FormData(dataform);

      var url = $(_this).attr('data-link');

      $.ajax({
        method: "POST",
        url: url,
        data: _data,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {


          if (data.status == 1) {
            if (data.av_update.avatar_change_status == 1) {
              $('.ntp_av_wrap').find('.alert-danger').fadeOut(200);
              $('.ntp_av_wrap').find('.alert-success').fadeIn(200).html(data.av_update.avatar_change + btn_close_success);
              var _av = $('.ntp_av');
              $(_av).each(function () {
                $(this).attr('src', data.av_update.av_link);
              });
            } else if (data.av_update.avatar_change_status == 0) {
              $('.ntp_av_wrap').find('.alert-success').fadeOut(200);
              $('.ntp_av_wrap').find('.alert-danger').fadeIn(200).html(data.av_update.avatar_change + btn_close_danger);
            }
          } else {
            var errors = data.errors;
            var errorMessages = '';
            for (var key in errors) {
              errorMessages += errors[key] + '</br>';
            }

            console.log(data.errors);

            $('.ntp_av_wrap').find('.alert-success').fadeOut(200);
            $('.ntp_av_wrap').find('.alert-danger').fadeIn(200).html(errorMessages);
          }

          $('body').trigger('ntp-alert-out');
        },
        error: function (error) {

        }
      });

    }
  });

  $('body').on('change', '#ntp_input_anhbiatruyen', function () {
    var fileInput = $(this)[0];
    var file = fileInput.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.ntp_anh_bia_wrap .ntp_anh_bia ').attr('src', e.target.result);
      }

      reader.readAsDataURL(file);
    }
  });
  // xin cấp quyền tác giả 
  $(".ntp_btn_create_author").on("click", function (event) {
    var _this = $(this);
    var _form = $(_this).parents('#ntp_form_create_author');
    var dataform = $(_this).parents('#ntp_form_create_author')[0];
    var _data = new FormData(dataform);

    var url = $(_form).attr('action');
    
    $.ajax({
      method: "POST",
      url: url,
      data: _data,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        console.log(data);
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
          // setTimeout(function() {
          //   location.reload();
          // }, 2000);
        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        if (data.file) {
          $(_form).find('#ntp_camket_da_upload').attr('src', data.file);
        }

        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {

      }
    });
    event.preventDefault();
  });

  $('body').on('click', '.ntp_btn_author_detail', function () {
    var _this = $(this)
    var url = $(_this).attr('data-link');
    $.ajax({
      method: "POST",
      url: url,
      success: function (data) {
        var ntp_author_detail = $('#ntp_author_detail');
        $(ntp_author_detail).find('.modal-body').html(data);
      },
      error: function (error) {

      }
    });
  });

  $('body').on('click', '.ntp_author_detail_update', function () {
    var _this = $(this)
    var pa = $(_this).parents('#ntp_author_detail');
    var _form = $(pa).find('.modal-body form');
    var url = $(_form).attr('data-link');
    var dataform = $(pa).find('.modal-body form')[0];
    var _data = new FormData(dataform);

    $.ajax({
      method: "POST",
      url: url,
      data: _data,
      contentType: false,
      processData: false,
      success: function (data) {
        $('body').trigger('ntp_admin_load_xetduyet_author_list');
        $('body').trigger('ntp_admin_load_author_list');
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);

          setTimeout(function () {
            $(pa).find('.btn-close').trigger('click');
          }, 1000);
        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $('body').trigger('ntp-alert-out');

      },
      error: function (error) {

      }
    });
  });

  $('body').on('click', '.ntp_btn_update_chapter', function () {
    var _this = $(this)
    var _form = $(_this).parents('form#ntp_form_update_chapter');
    var url = $(_form).attr('action');
    var dataform = $(_this).parents('form#ntp_form_update_chapter')[0];
    var _data = new FormData(dataform);

    $.ajax({
      method: "POST",
      url: url,
      data: _data,
      contentType: false,
      processData: false,
      success: function (data) {
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);

        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $('body').trigger('ntp-alert-out');

      },
      error: function (error) {

      }
    });
  });

  $('body').on('click','#danh_sach_nguoi_dung-tab',function(){
    var _this = $(this);
    var url = $(_this).attr('data-link');
    var danh_sach_nguoi_dung = $('#danh_sach_nguoi_dung');
      $.ajax({
        method: "Get",
        url: url,
        success: function (data) {
          
          $(danh_sach_nguoi_dung).html(data);
        },
        error: function (error) {
          $(danh_sach_nguoi_dung).html('<div class="alert alert-danger" role="alert">Có lỗi xảy ra</div>');
        }
      });
  });

  $('body').on('change','.admin_user_role_sl',function() {
    var selectedValue = $(this).val();
    var url =$(this).attr('data-link');
    var data = {
        admin_user_role: selectedValue
    };

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json', 
        data: JSON.stringify(data), 
        success: function(data) {
          if (data.status == 1) {
            $('.alert-danger').fadeOut(200);
            $('#ntp_admin_user_list_wrap').find('.alert-success').fadeIn(200).html(data.message + btn_close_success);

          } else if (data.status == 0) {
            var errors = data.errors;
            var errorMessages = '';
            for (var key in errors) {
              errorMessages += errors[key] + '</br>';
            }
            $('.alert-success').fadeOut(200);
            $('#ntp_admin_user_list_wrap').find('.alert-danger').fadeIn(200).html(data.message + btn_close_success);
          }
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
        }
    });

    setTimeout(function () {
      $('.alert-success').fadeOut(200);
      $('.alert-danger ').fadeOut(200);
    }, 2000);
});

$('body').on('change','input.admin_user_status, input.admin_user_comment',function() {
  var trangthai = $(this).is(':checked') ? 1 : 0;
  var url =$(this).attr('data-link');
  var data = {
      admin_user_status: trangthai
  };

  if ($(this).hasClass('admin_user_comment')) {
    data = {
      admin_user_comment: trangthai
    };
  }

  $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json', 
      data: JSON.stringify(data), 
      success: function(data) {
        if (data.status == 1) {
          $('.alert-danger').fadeOut(200);
          $('#ntp_admin_user_list_wrap').find('.alert-success').fadeIn(200).html(data.message + btn_close_success);

        } else if (data.status == 0) {
          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $('.alert-success').fadeOut(200);
          $('#ntp_admin_user_list_wrap').find('.alert-danger').fadeIn(200).html(data.message + btn_close_success);
        }
      },
      error: function(xhr, status, error) {
          console.log('Error:', error);
      }
  });

  setTimeout(function () {
    $('.alert-success').fadeOut(200);
    $('.alert-danger ').fadeOut(200);
  }, 2000);
});




  $('body').on('click','#xet_duyet_tacgia-tab',function(){
    $('body').trigger('ntp_admin_load_xetduyet_author_list');
  });

  // Load lại danh sách xét duyệt tác giả trong admin
  $('body').on('ntp_admin_load_xetduyet_author_list', function () {
    var btn = $('#xet_duyet_tacgia-tab');
    var xet_duyet_tacgia = $('#xet_duyet_tacgia');
    
    if ($(btn).length) {
      var url = $(btn).attr('data-link');

      $.ajax({
        method: "Get",
        url: url,
        success: function (data) {          
          $(xet_duyet_tacgia).html(data);
        },
        error: function (error) {
          $(xet_duyet_tacgia).html('<div class="alert alert-danger" role="alert">Có lỗi xảy ra</div>');
        }
      });
    }
  }).trigger('ntp_admin_load_xetduyet_author_list');

  $('body').on('click', '.ntp_chitiettruyen', function () {
    var _this = $(this)
    var url = $(_this).attr('data-link');
    $.ajax({
      method: "Get",
      url: url,
      success: function (data) {
        var ntp_edit_novel_poup = $('#ntp_edit_novel_poup ');
        $(ntp_edit_novel_poup).find('.modal-body').html(data);
      },
      error: function (error) {

      }
    });
  });

  $('body').on('click', '.ntp_admin_btn_update_novel', function () {
    var _this = $(this)
    var pa = $(_this).parents('#ntp_edit_novel_poup');
    var _form = $(pa).find('#ntp_form_novel_License');
    var url = $(_form).attr('action');
    var dataform = $(pa).find('.modal-body form')[0];
    var _data = new FormData(dataform);

    $.ajax({
      method: "POST",
      url: url,
      data: _data,
      contentType: false,
      processData: false,
      success: function (data) {
        $('body').trigger('ntp_admin_load_xetduyet_novel_list');
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);

          setTimeout(function () {
            $(pa).find('.btn-close').trigger('click');
          }, 1000);
        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $('body').trigger('ntp-alert-out');

      },
      error: function (error) {

      }
    });

    $('body').trigger('ntp_admin_load_novel_list');

  });

  $('#xet_duyet_tacpham-tab').click(function () {
    $('body').trigger('ntp_admin_load_xetduyet_novel_list');
  });

  $('body').on('ntp_admin_load_xetduyet_novel_list', function () {
    var btn = $('#xet_duyet_tacpham-tab');

    if ($(btn).length) {
      var url = $(btn).attr('data-link');

      $.ajax({
        method: "Get",
        url: url,
        success: function (data) {
          var xet_duyet_tacpham = $('#xet_duyet_tacpham');
          $(xet_duyet_tacpham).html(data);
        },
        error: function (error) {

        }
      });
    }
  }).trigger('ntp_admin_load_xetduyet_novel_list');

  $('#danh_sach_tac_pham_chua_duyet').click(function () {
    $('body').trigger('ntp_admin_load_tacphamchuaxetduyet_novel_list');
    alert("abc");
  });

  $('body').on('ntp_admin_load_tacphamchuaxetduyet_novel_list', function () {
    var btn = $('#danh_sach_tac_pham_chua_duyet-tab');

    if ($(btn).length) {
      var url = $(btn).attr('data-link');

      $.ajax({
        method: "Get",
        url: url,
        success: function (data) {
          var xet_duyet_tacpham = $('#tac_pham_chuaduyet');
          $(xet_duyet_tacpham).html(data);
        },
        error: function (error) {

        }
      });
    }
  }).trigger('ntp_admin_load_tacphamchuaxetduyet_novel_list');

  $('.ntp_btn_create_novel,.ntp_btn_update_infor_novel').click(function (e) {
    var _this = $(this);
    var _form = $(_this).parents('#ntp_form_create_novel');
    var url = $(_form).attr('action');
    var motatruyen = CKEDITOR.instances.motatruyen.getData();
    var dataform = $(_this).parents('#ntp_form_create_novel')[0];
    var _data = new FormData(dataform);
    _data.set('motatruyen', motatruyen);

    $.ajax({
      method: "POST",
      url: url,
      data: _data,
      contentType: false,
      processData: false,
      success: function (data) {
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
          $('body').trigger('ntp_author_load_novel_list');


        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }
        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {

      }
    });
    e.preventDefault();
  });

  $('.ntp_btn_create_chapter').click(function (e) {
    var _this = $(this);
    var _form = $(_this).parents('#ntp_form_create_chapter');
    var url = $(_form).attr('action');
    var noidungchuong = CKEDITOR.instances.noidungchuong.getData();
    var dataform = $(_this).parents('#ntp_form_create_chapter')[0];
    var _data = new FormData(dataform);
    _data.set('noidungchuong', noidungchuong);

    $.ajax({
      method: "POST",
      url: url,
      data: _data,
      contentType: false,
      processData: false,
      success: function (data) {
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);

          // setTimeout(function(){
          //   location.reload();
          // },3000);

        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {

      }
    });
    e.preventDefault();
  });



  $('#danhsach_truyen-tab').on('click', function () {
    $('body').trigger('ntp_author_load_novel_list');
  })


  // Load lại danh sách truyện trong tác giả
  $('body').on('ntp_author_load_novel_list', function () {
    var btn = $('#danhsach_truyen-tab');

    if ($(btn).length) {
      var url = $(btn).attr('data-link');

      $.ajax({
        method: "POST",
        url: url,
        success: function (data) {
          var danhsach_truyen = $('#ntp_novel_list_wrap');
          $(danhsach_truyen).html(data);
        },
        error: function (error) {

        }
      });
    }

  }).trigger('ntp_author_load_novel_list');

  $('body').on('click', '.admin_kiemduyet_chuong', function () {
    var _this = $(this)
    var url = $(_this).attr('data-link');
    var _wrap = $('#ntp_chapter_detail_admin');
    $(_wrap).find('.ntp_load').html('Loading...');
    $.ajax({
      method: "GET",
      url: url,
      success: function (data) {

        var chapters = data.chapters;
        for (var key in chapters) {
          switch (key) {
            case 'id':
              $(_wrap).find('.' + key).val(chapters[key]);
              break;
            case 'iPublishingStatus':
              if (chapters[key] == 1) {
                $(_wrap).find('#xuly_chapter').prop('checked', true);
              } else {
                $(_wrap).find('#xuly_chapter').prop('checked', false);
              }
              break;
            case 'iPublishingStatus':
              if (chapters[key] == 1) {
                $(_wrap).find('#xuly_chapter').prop('checked', true);
              } else {
                $(_wrap).find('#xuly_chapter').prop('checked', false);
              }
              break;
            case 'iStatus':
              if (chapters[key] == 1) {
                $(_wrap).find('#trangthai_chapter').prop('checked', true);
              } else {
                $(_wrap).find('#trangthai_chapter').prop('checked', false);
              }
              break;
            case 'icharges':
              if (chapters[key] == 1) {
                (_wrap).find('.' + key).html('Có tính phí');
              } else {
                (_wrap).find('.' + key).html('Không tính phí');
              }
              break;
            default:
              $(_wrap).find('.' + key).html(chapters[key]);
          }
        }
      },
      error: function (error) {

      }
    });
  });

  $('body').on('click', '.ntp_chapter_page .ntp_pay_chapter', function () {
    var _this = $(this);
    var _ntp_content = $('.ntp_chapter_page .ntp_content');
    var url = $(_this).attr('data-link');

    var confirmAction = confirm('Bạn có chắc chắn muốn mua chương này');
    if (confirmAction) { 
      $.ajax({
        method: "Get",
        url: url,
        success: function (data) {
          if (data.status == 1) {
            $(_this).parents('.card').find('.alert-danger.ntp_alert_content').fadeOut(200);
            $(_this).parents('.card').find('.alert-success.ntp_alert_content').fadeIn(200).html(data.message + btn_close_success);
            $(_ntp_content).html(data.content);
          } else if (data.status == 0) {
            $(_this).parents('.card').find('.alert-success.ntp_alert_content').fadeOut(200);
  
            var errors = data.errors;
            var errorMessages = '';
            for (var key in errors) {
              errorMessages += errors[key] + '</br>';
            }
            $(_this).parents('.card').find('.alert-danger.ntp_alert_content').fadeIn(200).html(errorMessages + btn_close_danger);
          }
  
          $('body').trigger('ntp-alert-out');
        },
        error: function (error) {
  
        }
      });
    }
  });

  $('body').on('click', '.ntp_chapter_detail_admin_check', function () {
    var _this = $(this);
    var pa = $(_this).parents('.ntp_chapter_detail_admin')
    var _form = $(pa).find('#ntp_form_chapter_check');
    var url = $(_form).attr('action');

    var xuly = $(_form).find('#xuly_chapter').is(':checked') ? 1 : 0;
    var trangthai = $(_form).find('#trangthai_chapter').is(':checked') ? 1 : 0;
    var id = $(pa).find('#idChapter').val();
    var id_novel = $(_this).attr('data-id-novel');
    var _data = {
      xuly: xuly,
      trangthai: trangthai,
      id: id,
      id_novel: id_novel,
      _token: $(_form).find('input[name="_token"]').val()
    };

    $.ajax({
      method: "POST",
      url: url,
      data: JSON.stringify(_data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (data) {
        if (data.status == 1) {
          $(_form).find('.alert-danger').fadeOut(200);
          $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);
          $('body').trigger('ntp_author_load_novel_list');
          $('#ntp_mucluc').html(data.table);
          setTimeout(function () {
            $(pa).find('.btn-close').trigger('click');
          }, 1000);
        } else if (data.status == 0) {
          $(_form).find('.alert-success').fadeOut(200);

          var errors = data.errors;
          var errorMessages = '';
          for (var key in errors) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }

        $('body').trigger('ntp-alert-out');
      },
      error: function (error) {

      }
    });
  });

  $('body').on('ntp_bookmark_load_locall', function () {
    if ($('.ntp_bookmarks').hasClass('ntp_bookmarks_locall') && $('.ntp_bookmarks').length) {
      var bookmarks = localStorage.getItem('ntp_bookmarks');
      if (bookmarks) {

        bookmarks = JSON.parse(bookmarks);

        if (bookmarks.length !== 0) {
          var html = '';
          $.each(bookmarks, function (index, value) {
            html += '<div class="d-flex flex-row my-1 align-items-center justify-content-between">' +
              '<a href="' + value.link + '" class="title text-truncate text-decoration-none text-reset">' + value.title + '</a>' +
              '<a href="javascript:void(0);" data-id-novel="' + value.id + '" class="btn ntp_bookmark_remove ntp_locall btn-danger mx-2">X</a>' +
              '</div><hr>';
          });

          $('.ntp_bookmarks').html(html);
        } else {
          $('.ntp_bookmarks').html('');
        }
      }
    }
  }).trigger('ntp_bookmark_load_locall');

  $('body').on('ntp_history_load_locall', function () {
    if ($('.ntp_read_history').length && $('.ntp_read_history').hasClass('ntp_read_history_locall')) {
      var wrap = $('.ntp_read_history');
      var historys = localStorage.getItem('ntp_historys');
      if (historys) {
        var html = '';
        historys = JSON.parse(historys);
        if (historys.length !== 0) {
          $.each(historys, function (index, value) {
            html += '<div class="d-flex flex-row my-1 align-items-center justify-content-between">' +
              '<a href="' + value.link_novel + '" class="title text-truncate text-decoration-none text-reset">' + value.novel_name + '<br> ' + value.chapter_name + ' </a>' +
              '<div class="d-flex flex-row align-items-center">' +
              '<a href="' + value.link + '" title="Đọc tiếp" class="btn btn-success mx-2">...</a>' +
              '<a href="javascript:void(0);"  data-id-novel="' + value.id_novel + '" title="Xóa lịch sử" class="btn ntp_remove_readding_history btn-danger me-2">X</a>' +
              '</div>' +
              '</div>'
          });
        }
        $(wrap).html(html);
      }
    }
  }).trigger('ntp_history_load_locall');


  $('body').on('click', '.ntp_bookmark_remove', function (e) {
    var _this = $(this);
    var confirmAction = confirm('Bạn có chắc chắn muốn xoá đánh dấu này');
    if (confirmAction) { 
      if ($(_this).hasClass('ntp_locall')) {

        var bookmarks = localStorage.getItem('ntp_bookmarks');
        // console.log($(_this).attr('data-id-novel'));
        if (bookmarks) {

          bookmarks = JSON.parse(bookmarks);
          if (bookmarks.length !== 0) {
            var index_bm = null;
            $.each(bookmarks, function (index, value) {
              if (value.id == parseInt($(_this).attr('data-id-novel'))) {
                index_bm = index;
              }
            });

            bookmarks.splice(index_bm, 1);
          }

          if (getcookiepermission() == 'yes') {
            localStorage.setItem('ntp_bookmarks', JSON.stringify(bookmarks));
          }

          $('body').trigger('ntp_bookmark_load_locall');
        }

      } else {
        var url = $(_this).attr('data-link');

        $.ajax({
          method: "Get",
          url: url,
          success: function (data) {

            if (data.status == 1) {
              $('.alert-danger.ntp_alert_public').fadeOut(200);
              $('.alert-success.ntp_alert_public').fadeIn(200).html(data.message + btn_close_success);

              $(_this).parents('.ntp_bookmarks_card').replaceWith(data.bookmarks);

            } else if (data.status == 0) {
              var errors = data.errors;
              var errorMessages = '';
              for (var key in errors) {
                errorMessages += errors[key] + '</br>';
              }
              $('.alert-danger.ntp_alert_public').fadeIn(200).html(errorMessages + btn_close_danger);
            }
          },
          error: function (error) {

          }
        });
      }
    } 

    e.preventDefault();
  });

  $('body').on('click', '.ntp_remove_readding_history', function (e) {
    var _this = $(this);

    var confirmAction = confirm('Bạn có chắc chắn muốn xóa lịch sử đọc này');
    if (confirmAction) { 
      if ($(_this).parents('.ntp_read_history').hasClass('ntp_read_history_locall')) {
        var id_novel = $(this).attr('data-id-novel');
        var historys = localStorage.getItem('ntp_historys');
        var indexh = null;
        if (historys) {
          historys = JSON.parse(historys);
          if (historys.length !== 0) {
            $.each(historys, function (index, value) {
              if (value.id_novel == id_novel) {
                indexh = index;
              }
            });

            if (indexh != null) {
              historys.splice(indexh, 1);
              if (getcookiepermission() == 'yes') {
                localStorage.setItem('ntp_historys', JSON.stringify(historys));
              }
              $('body').trigger('ntp_history_load_locall');
            }
          }

        }

      } else {
        var url = $(_this).attr('data-link');
        $.ajax({
          method: "get",
          url: url,
          success: function (data) {
            
            if (data.status == 1) {
              $('.alert-danger.ntp_alert_public').fadeOut(200);
              $('.alert-success.ntp_alert_public').fadeIn(200).html(data.message + btn_close_success);

              $(_this).parents('.ntp_read_history_card').replaceWith(data.history);

            } else if (data.status == 0) {
              var errors = data.errors;
              var errorMessages = '';
              for (var key in errors) {
                errorMessages += errors[key] + '</br>';
              }
              $('.alert-danger.ntp_alert_public').fadeIn(200).html(errorMessages + btn_close_danger);
            }
          },
          error: function (error) {

          }
        });
      }
    }
    e.preventDefault();
  });

  $('body').on('load_user_setting',function(){
    var _form = $('#ntp_form_user_seting');
    var settingjson = '';

    if ($(_form).hasClass('ntp_locall_store')) {
      settingjson = localStorage.getItem('ntp_settings');
    } else {
      settingjson = $(_form).attr('data-setting');
    }

    if(settingjson) {
      var setting = JSON.parse(settingjson);
    
      if(setting.length !== 0) {
        $("body").css("font-family", setting.ntp_font);
        $(_form).find('#ntp_font_set').val(setting.ntp_font);
    
        if (setting.ntp_mode === 1) {
            $("html").attr("data-bs-theme", "dark");
            $(_form).find('#ntp_dark_mode').prop('checked', true);
        } else {
            $("html").attr("data-bs-theme", "light");
            $(_form).find('#ntp_dark_mode').prop('checked', false);
        }
      }
    }
    
  }).trigger('load_user_setting');

  $('body').on('click', '.ntp_user_seting_save', function () {
    var _this = $(this);
    var _form = $(_this).parents('.modal-content').find('#ntp_form_user_seting');
    var url = $(_form).attr('action');

    var ntp_font = $(_form).find('#ntp_font_set').val();
    var ntp_mode = $(_form).find('#ntp_dark_mode').is(':checked') ? 1 : 0;
    var _data = {
      ntp_font: ntp_font,
      ntp_mode: ntp_mode
    };    

    if ($(_form).hasClass('ntp_locall_store')) {

      if (getcookiepermission() == 'yes') {
        localStorage.setItem('ntp_settings', JSON.stringify(_data));
      } else {
        askcookiepermission($,'yes');
      }
      
      $('body').trigger('load_user_setting');
      $(_form).find('.alert-success').fadeIn(200).html('Cài đặt của bạn đã được lưu trên trình duyệt bạn nên đăng nhập để lưu trữ tốt hơn' + btn_close_success);

    } 
    else {
      $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(_data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
          if (data.status == 1) {
            $(_form).find('.alert-danger').fadeOut(200);
            $(_form).find('.alert-success').fadeIn(200).html(data.message + btn_close_success);

            $(_form).attr('data-setting',JSON.stringify(_data));
            $('body').trigger('load_user_setting');

          } else if (data.status == 0) {
            var errors = data.errors;
            var errorMessages = '';
            for (var key in errors) {
              errorMessages += errors[key] + '</br>';
            }
            $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
          }
        },
        error: function (error) {
          var errorMessages = '';
          for (var key in error) {
            errorMessages += errors[key] + '</br>';
          }
          $(_form).find('.alert-danger').fadeIn(200).html(errorMessages + btn_close_danger);
        }
      });
    }
    setTimeout(function () {
      $('.alert-success:not(.ntp_alert_static)').fadeOut(200);
      $('.alert-danger:not(.ntp_alert_static)').fadeOut(200);
    }, 1000);
    
  });


  if ($('#ntp_login_register_modal').length) {

    if ($('.ntp_novel_single').length) {

      var bookmarks = localStorage.getItem('ntp_bookmarks');
      var id = $('.ntp_novel_single').attr('data-novel-id');

      if (bookmarks) {
        bookmarks = JSON.parse(bookmarks);

        if (bookmarks.length !== 0) {
          $.each(bookmarks, function (index, value) {
            if (value.id == id) {
              // console.log(id);
              $('.ntp_novel_single .ntp_mark>p').removeClass('text-success').addClass('text-danger').html('<i class="fa-solid fa-bookmark me-2" aria-hidden="true"></i>Hủy đánh dấu');
            }
          });
        }
      }
    }

    if ($('.ntp_chapter_page').length) {
      var historys = localStorage.getItem('ntp_historys');
      var novel_name = $('.ntp_chapter_title').find('.ntp_novel_name').text();
      var chapter_name = $('.ntp_chapter_title').find('.ntp_chapter_name').text();
      var link = $(location).attr('href');
      var id_novel = $('.ntp_chapter_title').attr('data-id-novel');
      var link_novel = $('.ntp_chapter_title').attr('data-link-novel');
      if (historys) {
        historys = JSON.parse(historys);
      } else {
        historys = [];
      }

      var historyExist = false;

      if (historys.length !== 0) {
        $.each(historys, function (index, value) {
          if (value.id_novel == id_novel) {
            historyExist = true;
            value.link = link;
            value.novel_name = novel_name;
            value.chapter_name = chapter_name;
            value.link_novel = link_novel;
          }
        });
      }

      if (!historyExist) {
        historys.push({
          novel_name: novel_name,
          chapter_name: chapter_name,
          id_novel: id_novel,
          link: link,
          link_novel: link_novel
        });
      }

      if (getcookiepermission() == 'yes') {
        localStorage.setItem('ntp_historys', JSON.stringify(historys));
      }
    }
  }

  $('body').on('click', '.ntp_mark', function () {
    var _this = $(this);
    var id = $(_this).attr('data-novel-id');
    var url = $(_this).attr('data-link');
    var name = $(_this).attr('data-name');
    var novel_url = $(_this).attr('data-novel-link');
    var _p = $(_this).find('>p');
    var _data = {
      id_novel: id
    };

    $.ajax({
      method: "POST",
      url: url,
      data: JSON.stringify(_data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (data) {
        $(_p).html(data.message);
        $('.ntp_count_bookmark').html(data.bookmarks + ' đánh dấu')
        if (data.status == 1) {
          $(_p).removeClass('text-danger').addClass('text-success');
        } else if (data.status == 0) {
          $(_p).removeClass('text-success').addClass('text-danger');
        } else if (data.status == 3) {
          var bookmarks = localStorage.getItem('ntp_bookmarks');

          if (getcookiepermission() == 'yes') {
            if (bookmarks) {
              bookmarks = JSON.parse(bookmarks);
            } else {
              bookmarks = [];
            }
  
            var bookmarlExist = false;
            var index_bookmar = null;
  
            if (bookmarks.length !== 0) {
              $.each(bookmarks, function (index, value) {
                if (value.id == id) {
                  bookmarlExist = true;
                  index_bookmar = index;
                }
              });
            }
  
            if (bookmarlExist) {
              bookmarks.splice(index_bookmar, 1);
              $(_p).removeClass('text-danger').addClass('text-success').html('<i class="fa-solid fa-bookmark me-2" aria-hidden="true"></i>Đánh dấu');
            } else {
              bookmarks.push({
                id: id,
                title: name,
                link: novel_url
              });
              $(_p).removeClass('text-success').addClass('text-danger').html('<i class="fa-solid fa-bookmark me-2" aria-hidden="true"></i>Hủy đánh dấu');
            }
  
              localStorage.setItem('ntp_bookmarks', JSON.stringify(bookmarks));   
          } else {
            askcookiepermission($,'yes');
          }  

        }
      },
      error: function (error) {

      }
    });

  });

  $('body').on('click', '.ntp-show-hide-pass', function () {
    var _this = $(this);
    var _wrap = $(_this).parents('.ntp_pass_wrap');
    var input = $(_wrap).find('input');
    var type = $(input).attr('type');

    if (type === "password") {
      $(input).attr('type', 'text');
      $(this).addClass('text-danger').removeClass('text-success');
    } else {
      $(input).attr('type', 'password');
      $(this).addClass('text-success').removeClass('text-danger');
    }
  });

  $('body').on('click', '.dropdown-item[data-bs-toggle="pill"]:not(.ntp_view_child)', function () {
    if ($(this).attr('data-bs-toggle') == 'pill') {
      var id = $(this).attr('id');
      var target = $(this).attr('data-bs-target');
      setUrlParameter('view',id);
      $('html, body').animate({
        scrollTop: $(target).offset().top-100
      }, 200);
    }
  });

  $('body').on('click', '.ntp_alert_close .btn-close,.modal .btn-close', function () {
    $('.alert:not(.ntp_alert_static)').fadeOut(200);
  });

  $('body').on('ntp-alert-out', function () {
    setTimeout(function () {
      $('.alert:not(.ntp_alert_static)').fadeOut(200);
    }, 4000);
  });

  $('body').on('input','.admin_search_tacgia',function() {
    var text = $(this).val();
    var drop = $('.ntp_drop_down_search_author');
    if (text.length >= 3) {
      var url = $(this).attr('data-link')+'/'+text;

      $.ajax({
        method: "POST",
        url: url,
        success: function (data) {
          $(drop).find('.card-body').html(data.html);
        },
        error: function (error) {
  
        }
      });
    } else {
      $(drop).find('.card-body').html('');
    }
  });

  $('body').on('click','.ntp_item_tacgia',function () {
      $('.admin_search_tacgia').attr('data-iduser',$(this).attr('data-iduser'));
      $('.admin_search_tacgia').val($(this).text());
  });

  $('body').on('click','.ntp_home_cat_search_item',function () {
      $('.ntp_home_cat_search_form .ntp_home_cat_search_form_submit').trigger('click');
  });

  $('body').on('click','#ntp-cookie-ask .modal-footer .btn',function () {
    var ask = '';
      if($(this).attr('data-ask') == 'no') {
         ask = 'no';
      } else if ($(this).attr('data-ask') == 'yes') {
         ask = 'yes';
      }
      localStorage.setItem('ntp_cookie_permission',ask);
  });

  askcookiepermission($,'');
  
});

$(window).on('load', function() {
  queryParams = getUrlParameter($);
  setTimeout(function(){

    if (Object.keys(queryParams).length != 0) {
      if ('view' in queryParams && queryParams.view != '') {
        var target = $('#'+queryParams.view).attr('data-bs-target');
        $('#'+queryParams.view).trigger('click');
        if ($(target).length) {
          $('html, body').animate({
            scrollTop: $(target).offset().top-100
          }, 200);
        }
      }
    }
  },100);

  if($('#user_report_list-tab').length) {
    $('#user_report_list-tab').trigger('click');
  }

  checkAndReplaceImages();
});

function checkAndReplaceImages() {
  $('img').each(function() {
      var imgElement = $(this);
      var imageUrl = imgElement.attr('src');
      
      var image = new Image();
      image.onload = function() {
      };
      image.onerror = function() {
        if ($(imgElement).hasClass('ntp_anh_bia')) {
          $(imgElement).attr('src', $('.ntp_default_img').attr('data_img_novel_df')); 
        }

        if ($(imgElement).hasClass('ntp_av')) {
          $(imgElement).attr('src', $('.ntp_default_img').attr('data_img_av_df')); 
        }
        
      };
      image.src = imageUrl;
  });
}

function getUrlParameter($) {
    var currentURL = window.location.href;
    var queryString = currentURL.split('?')[1];
    var queryParams = {};

    if (queryString) {
        var paramsArray = queryString.split('&');
        
        for (var i = 0; i < paramsArray.length; i++) {
            var pair = paramsArray[i].split('=');
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1] || '');
            queryParams[key] = value;
        }
    }

    return queryParams;
}

function setUrlParameter(paramName, paramValue) {
  var urlObj = new URL(window.location.href);
  urlObj.searchParams.set(paramName, paramValue);
  window.history.pushState({ path: urlObj.toString() }, '', urlObj.toString());
}

function getcookiepermission() {
  var _per = localStorage.getItem('ntp_cookie_permission');
  if (!_per) {
    _per = 'no';
  }
  return _per;
}

function askcookiepermission($,show) {
  var _per = localStorage.getItem('ntp_cookie_permission');
  if (!_per || show == 'yes') {
    $('.ntp-cookie-ask-btn').trigger('click');
  }
}