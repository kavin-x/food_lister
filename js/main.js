//fetch items



(function ($) {
  "use strict";

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });


  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $(".navbar").addClass("nav-sticky");
    } else {
      $(".navbar").removeClass("nav-sticky");
    }
  });

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Main carousel
  $(".carousel .owl-carousel").owlCarousel({
    autoplay: true,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    items: 1,
    smartSpeed: 300,
    dots: false,
    loop: true,
    nav: false,
  });

  //get food items

  let breakfastdata=[];
  let breakfast = document.getElementById("breakfast");
  let lunch = document.getElementById("lunch");
  let dinner = document.getElementById("dinner");
  let breakfastInnerHTML = "";
  let lunchInnerHTML = "";
  let dinnerInnerHTML = "";
  async function getItems() {
      try {
        const request = async () => {
          const response = await fetch("https://r1ck.pythonanywhere.com/menu/");
          const json = await response.json();
          console.log(json);
          breakfastdata.push(...json)
        
        };
        const result = await request(); // Now this will wait till it finished
        breakfastdata.forEach(
          (item) =>
          {console.log(item);
            (breakfastInnerHTML += `
                      <div class="food-card m-4 justify-content-center">
                          <div class="food-card_img">
                              <img src="https://r1ck.pythonanywhere.com/media/${item.fields.item_image}" alt="">
                              <a href="#!"><i class="far fa-heart"></i></a>
                          </div>
                          <div class="food-card_content">
                              <div class="food-card_title-section">
                                  <a href="#!" class="food-card_title">${item.fields.item_name}</a>
                                  <a href="#!" class="food-card_author">${item.fields.serve_type}</a>
                              </div>
                              <div class="food-card_bottom-section">
                                  <div class="space-between">
                                      <div>
                                          <span class="fa fa-fire"></span> 220 - 280 Kcal
                                      </div>
                                      <div class="pull-right">
                                          <span class="badge badge-success">NonVeg</span>
                                      </div>
                                  </div>
                                  <hr>
                                  <div class="space-between">
                                      <div class="food-card_price">
                                          <span>${item.fields.price}$</span>
                                      </div>
                                      <div class="food-card_order-count">
                                          <div class="input-group mb-3">
                                              <h5 style="align-items: center;display: flex;flex-direction:row;align-items: center;justify-content: center;" >Quantity</h5>
                                              <input type="text" class="form-control input-manulator" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" value="${item.fields.avilable_quantity}" disabled>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>`)}
        );
        
        breakfast.innerHTML = `<div class="container" style="display: flex;flex-wrap: wrap;">
                 ${breakfastInnerHTML} 
      </div>
      </section>`;
      } catch (e) {
        console.log(e);
      }
    }
    getItems();


  

  

  // Date and time picker
  $("#date").datetimepicker({
    format: "L",
  });
  $("#time").datetimepicker({
    format: "LT",
  });

  // Testimonials carousel
  $(".testimonials-carousel").owlCarousel({
    center: true,
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Related post carousel
  $(".related-slider").owlCarousel({
    autoplay: true,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  });
})(jQuery);
