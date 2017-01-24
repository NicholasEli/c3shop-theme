<?php
function c3shop_get_cart_items(){
    global $user;
$quantity = 0;
$order = commerce_cart_order_load($user->uid);

if ($order) {
    $wrapper = entity_metadata_wrapper('commerce_order', $order);
    $line_items = $wrapper->commerce_line_items;
    $quantity = commerce_line_items_quantity($line_items, commerce_product_line_item_types());
    $total = commerce_line_items_total($line_items);
    $currency = commerce_currency_load($total['currency_code']);
}

return $quantity;
}
// Preprocess variables for  html.tpl.php.
//template_preprocess_html
function c3shop_preprocess_html(&$variables) {
  // Ensure that the $vars['rdf'] variable is an object.
 if (!isset($variables['rdf']) || !is_object($variables['rdf'])) {
    $variables['rdf'] = new StdClass();
 }
 if (module_exists('rdf')) {
     $variables['doctype'] = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML+RDFa 1.1//EN">' . "\n";
     $variables['rdf']->version = ' version="HTML+RDFa 1.1"';
     $variables['rdf']->namespaces = $variables['rdf_namespaces'];
     $variables['rdf']->profile = ' profile="' . $variables['grddl_profile'] . '"';
 } else {
     $variables['doctype'] = '<!DOCTYPE html>' . "\n";
     $variables['rdf']->version = '';
     $variables['rdf']->namespaces = '';
     $variables['rdf']->profile = '';
 }
}




// Lets add themes based on URL and other content types
function c3shop_preprocess_page(&$variables, $hook) {
   // Page template suggestions based off of content types
   if (isset($variables['node'])) { 
                $variables['theme_hook_suggestions'][] = 'page__type__'. $variables['node']->type;
                $variables['theme_hook_suggestions'][] = "page__node__" . $variables['node']->nid;
   }
   
   // Page template suggestions based off URL alias
   if (module_exists('path')) {
    $alias = drupal_get_path_alias(str_replace('/edit','',$_GET['q']));
    if ($alias != $_GET['q']) {
      $template_filename = 'page';
      foreach (explode('/', $alias) as $path_part) {
        $template_filename = $template_filename . '__' . $path_part;
        $variables['theme_hook_suggestions'][] = $template_filename;
      }
    }
  }
   
}

/**
* theme_menu_link()
*/
function c3shop_menu_link(array $variables) {
//add class for li
   $variables['element']['#attributes']['class'][] = 'menu-' . $variables['element']['#original_link']['mlid'];
//add class for a
   $variables['element']['#localized_options']['attributes']['class'][] = 'menu-' . $variables['element']['#original_link']['mlid'];
//dvm($variables['element']);
  return theme_menu_link($variables);
}


/**
* Process variables for search-result.tpl.php.
*
* @see search-result.tpl.php
*/
function c3shop_preprocess_search_result(&$variables) {
  // Add node object to result, so we can display imagefield images in results.
  $n = node_load($variables['result']['node']->nid);
  $n && ($variables['node'] = $n);
}

function c3shop_preprocess_search_results(&$variables) {
  $variables['search_results'] = '';
  $resultTypes = array();
   
    // Divide results
    foreach ($variables['results'] as $result){
      $resultTypes[$result['type']][] = $result;
    }
   
  // Create fieldsets
  foreach ($resultTypes as $resultType => $resultTypeResults){
    $value = "";
   
    foreach ($resultTypeResults as $result){
      $value .= theme('search_result', array('result' => $result, 'module' => $variables['module']));
    }
   
    $variables['search_results'] .= theme('fieldset', array('element' => array('#title' => $resultType, '#value' => $value)));
  }
}





