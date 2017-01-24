<?php 
  include 'components/header.php';
  include 'components/search-bar.php'; 

  if ($page['user_messages']) {
      print render($page['user_messages']);
  }
?>
<!-- end navigation begin content -->
<main>
  <?php
      print render($title_prefix);
      print render($title_suffix);
      //print $messages;
      print render($page['help']);
      global $user;
      if(drupal_is_front_page()){
        //if page front
      }
      if (!isset($account)) {
        $account = $user;
      }

      if ($page['content']) {
          print render($page['content']);
      }
  ?>
</main>
<!-- end content begin footer -->
<?php 
    include 'components/footer.php'; 
    include 'components/user-cards.php'; 
    include 'components/admin-menu.php';
    
//update settings
function get_errors() {
  $items = array(); 
  foreach (drupal_get_messages() as $type => $messages) {
    foreach ($messages as $key => $message) {
      $item = array('content' => $message);
      $items[] = $item;
    }
  }

  return $items;
}


function c3Shop_settings() {
  global $user;
  drupal_add_js(
    array(
      'c3Shop'  => array(
        'cart_items'  => variable_get('c3Shop_cart_items', c3shop_get_cart_items()),
        'user'        => variable_get('c3Shop_user', $user),
        'form_errors' => variable_get('c3Shop_form_errors', get_errors())
      )
    ),
    'setting'
  );
}
//c3Shop_settings(); 

?>