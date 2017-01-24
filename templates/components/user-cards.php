<!--cart-->
<div class="user-menu__card" id="user-cart">
  <div class="user-menu__card-section">
    <div class="user-menu__card--title">Your Cart</div>
    <div class="user-menu__card--close-btn"></div>
  </div>
  <div class="user-menu__card-section" id="cart-items">
    <?php
        $shoppingbag = module_invoke('commerce_cart', 'block_view', 'cart');
        print render($shoppingbag['content']);
    ?>
  </div>
  <div class="user-menu__card-section" id="checkout"><a class="button__plain button__plain--primary" href="<?php print base_path() . 'cart' ;?>">Check Out</a></div>
</div>
<!--login-->
<div class="user-menu__card" id="login-user">
  <div class="user-menu__card-section">
    <div class="user-menu__card--title">User</div>
    <div class="user-menu__card--close-btn"></div>
  </div>
  <div class="user-menu__card-section" id="login-form">
    <?php
    if(!user_is_logged_in()){
        $user_login_block = drupal_get_form("user_login_block"); 
        $form = drupal_render($user_login_block);
        print $form . theme('status_messages'); 
    }else{
      print '<a id="dashboard-btn" class="button__plain button__plain--primary" href="'.base_path() . 'user">Dashboard</a>';
      print '<a id="logout-btn" class="button__plain button__plain--red logout-btn" href="'.base_path() . 'user/logout">Log Out</a>';
    }
    ?>
  </div>
</div>

<!--newsletter signup-->
<div class="user-menu__card" id="newsletter-signup">
  <div class="user-menu__card-section">
    <div class="user-menu__card--title">Newsletter Signup</div>
    <div class="user-menu__card--close-btn"></div>
  </div>
  <form id="newsletter-form">
    <div class="user-menu__card-section" >
      <input type="email" name="newsletter_signup" placeholder="Enter your email address" required>
    </div>
    <div class="user-menu__card-section" >
      <input class="button__plain button__plain--primary" type="submit">
    </div>
  </form>
</div>