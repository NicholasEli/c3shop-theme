<section id="user-logout" class="user__controls">
  <a href="<?php print base_path();?>user/logout">Logout</a>
</section>
<?php 
// Get the Current User Profile ID - useful for admins who want to view customer's profile page
$customer = menu_get_object('user');
//kpr($customer);


// Get the Current Logged in User ID
$account = $GLOBALS['user'];
$username = $account->name;

if (($account->uid == 1 || in_array('administrator', $account->roles) || in_array('storeadmin', $account->roles)) && ($account->uid == $customer->uid))  { 

?> 

<section class="admin__controls">
    <h4 class="title__plain title__plain--plain-heavy">Administration Links</h4>
    <div class="admin__links-wrapper">
        <a href="<?php print base_path() . 'admin/commerce/reports';?>" class="admin__link--round">Sales<br>Reports</a>
        <a href="<?php print base_path() . 'admin/commerce/coupons';?>" class="admin__link--round">Coupon<br>Manager</a>
        <a href="<?php print base_path() . 'admin/config/proform';?>" class="admin__link--round">Manage<br>Proforms</a>
        <a href="<?php print base_path() . 'import';?>" class="admin__link--round">Import<br>Inventory</a>
        <a href="<?php print base_path() . 'admin/content';?>" class="admin__link--round">Content Manager</a>
    </div>
</section>
<!-- sales -->
<!--
<section class="sales">
    <h4 class="title__plain title__plain--plain-heavy">Sales At A Glance</h4>
    <?php
        //print views_embed_view('commerce_reports_sales', 'page_4');
    ?>
</section>
-->

<!-- /sales -->
<section class="admin__controls">
    <h4 class="title__plain title__plain--plain-heavy">Customer Support</h4>
    <div class="customer__support-box-wrapper">
        <div id="olark-options" class="customer__support-box">
            <p>Let customers chat with our support team directly from our website.</p>
            <div id="chat-status"></div>
            <div id="open-chat">
                <a class="button__plain button__plain--primary" href="https://www.olark.com" target="_blank">Open Olark</a>
            </div>
        </div>
        <div id="search-customers" class="customer__support-box">
            <h6 class="title__plain title__plain--plain-heavy">Search Customers</h6>
            <?php
                $viewCustomerSearch = views_get_view('search_customers');
                $viewCustomerSearch->set_display('deafult');
                $viewCustomerSearchDisplay = $viewCustomerSearch->preview();
                print $viewCustomerSearchDisplay;
            ?>
        </div>
        <div id="search-orders" class="customer__support-box">
            <h6 class="title__plain title__plain--plain-heavy">Search Orders</h6>
            <?php
                $viewOrderSearch = views_get_view('search_orders');
                $viewOrderSearch->set_display('deafult');
                $viewOrderSearchDisplay = $viewOrderSearch->preview();
                print $viewOrderSearchDisplay;
            ?>
        </div>
    </div>
</section>
<section id="orders" class="admin__controls">
    <h6 class="title__plain title__plain--plain-heavy">Orders</h6>
    <?php
        $viewOrderPending = views_get_view('commerce_backoffice_orders');
        $viewOrderPending->set_display('admin_page');
        $viewOrderPendingDisplay = $viewOrderPending->preview();
        print $viewOrderPendingDisplay;
    ?>
</section>
<section id="products" class="admin__controls">
    <h6 class="title__plain title__plain--plain-heavy">Product Management</h6>
    <?php
        $viewProducts = views_get_view('commerce_products');
        $viewProducts->set_display('admin_page');
        $viewProductsDisplay = $viewProducts->preview();
        print $viewProductsDisplay;
    ?>
</section>

<!-- ELSE -->
<?php } else { ?>
 <!-- ELSE -->

<section id="page-header">
    <h4 class="title__plain title__plain--plain-heavy">Account Information</h4>
</section>
  
<section id="profile"<?php print $attributes; ?> class="user__controls">
    <div id="acount-Information">
            <?php
                if (module_exists('commerce_addressbook')) {
                    $billing_profile_id = commerce_addressbook_get_default_profile_id($customer->uid, 'billing');
                    if ($billing_profile_id) {
                      $billing_profile = commerce_customer_profile_load($billing_profile_id);
                      $billingName = $billing_profile->commerce_customer_address[LANGUAGE_NONE][0]['name_line'];
                    }
                }
            ?>
            <?php
                if (module_exists('commerce_addressbook')) {
                    $shipping_profile_id = $billing_profile_id = NULL;
                    // Customer Profile
                    print '<div id="customer-profile"><h6 class="title__plain title__plain--black-small">Customer Profile</h6><p>' . $customer->name .'<br>'. $customer->mail . '</p>' . l(t('Edit'), 'user/' . $customer->uid . '/edit', array('attributes'=>array('class'=>'edit'))) .'</div>';
                    // Shipping Details
                    if (commerce_addressbook_profile_page_access($customer, 'shipping')) {
                        $shipping_profile_id = commerce_addressbook_get_default_profile_id($customer->uid, 'shipping');
                        if ($shipping_profile_id) {
                            $shipping_profile = commerce_customer_profile_load($shipping_profile_id);
                            $shipping_profile_render = entity_view('commerce_customer_profile', array($shipping_profile), 'full');
                            $shipping_profile_render = reset($shipping_profile_render);
                            $shipping_profile_output = drupal_render($shipping_profile_render);
                        }
                        else {
                            $shipping_profile_output = '<p>' . t('No default shipping profile') . '</p>';
                        }
                        print '<div id="shipping-address"><h6 class="title__plain title__plain--black-small">Shipping Address</h6>' . $shipping_profile_output . l(t('Edit'), 'user/' . $customer->uid . '/addressbook/shipping', array('attributes'=>array('class'=>'edit'))). '</div>';
                    }
                    // Billing Info
                    if (commerce_addressbook_profile_page_access($customer, 'billing')) {
                        $billing_profile_id = commerce_addressbook_get_default_profile_id($customer->uid, 'billing');
                        if ($billing_profile_id) {
                          $billing_profile = commerce_customer_profile_load($billing_profile_id);
                          $billing_profile_render = entity_view('commerce_customer_profile', array($billing_profile), 'full');
                          $billing_profile_render = reset($billing_profile_render);
                          $billing_profile_output = drupal_render($billing_profile_render);
                        }
                        else {
                          $billing_profile_output = '<p>' . t('No default billing profile') . '</p>';
                        }
                        print '<div id="billing-address"><h6 class="title__plain title__plain--black-small">Billing Address</h6>' . $shipping_profile_output . l(t('Edit'), 'user/' . $customer->uid . '/addressbook/billing', array('attributes'=>array('class'=>'edit'))). '</div>';
                    }
                } 
            ?>
    </div>
</section>
<?php }?>

<section id="recent-orders" class="user__controls">
        <h6 class="title__plain title__plain--plain-heavy">Order History</h6>
        <?php print views_embed_view('commerce_backoffice_user_orders', 'block_1', $customer->uid); ?>
</section>
