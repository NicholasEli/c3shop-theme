<header id="header">
  <div class="container">
    <section class="header__tier" id="header-top">
      <div id="header-logo">
        <a href="<?php print base_path(); ?>">
          <svg width="100%" height="100%" viewBox="0 0 100 66" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
              <g transform="matrix(2.13989,0,0,2.13989,-84.8938,-195.391)">
                  <path d="M79.964,106.399C80.599,105.812 85.679,101.115 85.679,101.115L83.467,91.309L54.605,91.512C46.318,91.621 39.62,98.45 39.672,106.736C39.723,114.977 46.469,121.72 54.712,121.77C54.732,121.77 54.796,121.772 54.796,121.772L62.229,121.723L62.215,119.369L54.782,119.417C47.796,119.403 42.074,113.709 42.029,106.721C41.985,99.732 47.637,93.966 54.625,93.871C54.625,93.873 78.559,93.725 81.591,93.706C81.715,94.252 82.995,99.912 83.084,100.309C82.766,100.603 75.975,106.881 75.975,106.881L76.516,107.127C79.308,108.382 83.996,111.743 84.048,120.145L83.961,121.504L84.381,121.516L86.321,121.503L86.403,120.147C86.354,112.572 82.97,108.515 79.964,106.399" style="fill:rgb(224,220,206);fill-rule:nonzero;"/>
              </g>
              <g transform="matrix(2.13989,0,0,2.13989,-84.8938,-195.391)">
                  <path d="M63.666,100.012L54.652,100.056C51.14,100.14 48.407,102.932 48.431,106.416C48.452,109.868 51.279,112.707 54.735,112.743L62.227,112.697L62.212,110.338L54.726,110.385C52.573,110.35 50.803,108.563 50.789,106.402C50.776,104.239 52.522,102.43 54.683,102.367L63.555,102.318C63.555,102.318 67.595,102.293 68.962,102.285C67.898,103.374 62.475,108.927 62.475,108.927L65.55,108.908C68.82,108.919 71.5,111.591 71.52,114.862C71.541,118.03 69.078,120.673 65.914,120.876L65.941,121.66L70.728,121.631L70.832,121.546C72.887,119.902 74.056,117.46 74.041,114.845C74.016,111.024 71.388,107.719 67.719,106.698C68.513,105.889 74.3,99.968 74.3,99.968L63.666,100.012Z" style="fill:rgb(224,220,206);fill-rule:nonzero;"/>
              </g>
          </svg>
        </a>
      </div>
      <div id="header-search-account-cart"><a class="header__button card-nav" href="#user-cart" id="header-cart">
          <?php 
              if(c3shop_get_cart_items() != 0){
               print '<div class="cart__status"><span class="cart__status-item">'.c3shop_get_cart_items().'</span></div>';
              } 
          ?>
          <svg width="100%" height="100%" viewbox="0 0 90 90" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421">
            <g transform="matrix(4.08778,-3.59501e-16,-3.59501e-16,5.55556,-5888.29,-511.442)">
              <path d="M1458.01,106.528L1444.93,106.528L1442.18,97.232L1460.76,97.232L1458.01,106.528ZM1449.13,93.493C1449.15,93.469 1449.16,93.444 1449.17,93.419L1453.76,93.419C1453.77,93.443 1453.79,93.47 1453.8,93.493L1455.42,95.764L1447.51,95.764L1449.13,93.493ZM1461.95,95.793C1461.88,95.774 1461.81,95.764 1461.75,95.764L1457.23,95.764L1455,92.645C1454.89,92.483 1454.72,92.377 1454.54,92.34L1454.54,92.33L1454.44,92.33C1454.42,92.329 1454.4,92.323 1454.38,92.324C1454.35,92.325 1454.33,92.327 1454.31,92.33L1448.63,92.33C1448.6,92.327 1448.57,92.324 1448.54,92.324C1448.52,92.324 1448.51,92.329 1448.49,92.33L1448.47,92.33L1448.47,92.333C1448.25,92.356 1448.06,92.466 1447.94,92.645L1445.71,95.764L1441.19,95.764C1441.17,95.762 1441.14,95.762 1441.12,95.764C1440.71,95.806 1440.42,96.167 1440.46,96.57C1440.47,96.616 1440.48,96.66 1440.49,96.704L1443.67,107.468C1443.76,107.781 1444.05,107.995 1444.38,107.996L1458.56,107.996C1458.89,107.995 1459.18,107.781 1459.27,107.468L1462.45,96.704C1462.56,96.315 1462.34,95.907 1461.95,95.793" style="fill:white;fill-rule:nonzero"></path>
            </g>
          </svg><span class="header__button-label">Cart</span></a><a class="header__button card-nav" href="#login-user" id="header-account">
          <svg width="100%" height="100%" viewbox="0 0 90 90" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421">
            <g transform="matrix(5.13999,-9.38531e-17,-1.01785e-16,5.12264,-7139.32,-461.494)">
              <path d="M1397.73,92.609C1399.12,92.609 1400.24,93.732 1400.24,95.117C1400.24,96.502 1399.12,97.625 1397.73,97.625C1396.35,97.625 1395.22,96.502 1395.22,95.117C1395.23,93.733 1396.35,92.611 1397.73,92.609M1400.45,99.319C1402.78,97.816 1403.45,94.711 1401.94,92.384C1400.44,90.057 1397.34,89.389 1395.01,90.892C1392.68,92.395 1392.01,95.5 1393.52,97.828C1393.9,98.425 1394.41,98.934 1395.01,99.319C1391.63,100.425 1389.25,103.457 1388.98,107.001C1388.96,107.347 1389.23,107.64 1389.57,107.657C1389.59,107.657 1389.6,107.658 1389.61,107.658L1390.87,107.658C1391.2,107.652 1391.47,107.393 1391.49,107.062C1391.82,103.614 1394.88,101.086 1398.33,101.416C1401.32,101.701 1403.69,104.07 1403.97,107.062C1403.99,107.393 1404.27,107.652 1404.6,107.658L1405.85,107.658C1406.2,107.661 1406.48,107.383 1406.49,107.037C1406.49,107.025 1406.49,107.013 1406.49,107.001C1406.21,103.456 1403.83,100.425 1400.45,99.319" style="fill:white;fill-rule:nonzero"></path>
            </g>
          </svg>
            <span class="header__button-label">
              <?php
                if(!user_is_logged_in()){
                  print 'Log In';
                  
                }else{
                  print 'Account';
                }
              ?>
            </span>
          </a><a class="header__button" href="#search-bar" id="header-search">
          <svg width="100%" height="100%" viewbox="0 0 90 90" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421">
            <g transform="matrix(5.55556,0,0,5.55556,-7358.92,-506.485)">
              <path d="M1331.29,102.756C1328.59,102.756 1326.4,100.563 1326.4,97.866C1326.4,95.171 1328.59,92.977 1331.29,92.977C1333.99,92.977 1336.18,95.171 1336.18,97.866C1336.18,100.563 1333.99,102.756 1331.29,102.756M1340.71,105.433L1336.87,101.592C1337.6,100.498 1338,99.213 1338,97.866C1338,96.075 1337.3,94.391 1336.03,93.125C1334.76,91.858 1333.08,91.16 1331.29,91.16C1329.5,91.16 1327.81,91.858 1326.55,93.125C1325.28,94.391 1324.58,96.075 1324.58,97.866C1324.58,99.658 1325.28,101.342 1326.55,102.609C1327.81,103.875 1329.5,104.573 1331.29,104.573C1332.65,104.573 1333.95,104.169 1335.05,103.42L1338.89,107.255C1339.08,107.446 1339.43,107.404 1339.67,107.163L1340.62,106.215C1340.86,105.973 1340.9,105.623 1340.71,105.433" style="fill:white;fill-rule:nonzero"></path>
            </g>
          </svg><span class="header__button-label">Search</span></a></div>
    </section>
    <section class="header__tier" id="header-middle">
      <nav>
        <ul>
          <?php
          if ($page['capita_menu_links']) {
            print '<li><a class="box__link box__link--dk-blue" href="#capita-navigation">Capita</a></li>';
          }
          if ($page['coal_menu_links']) {
            print '<li><a class="box__link box__link--dk-blue" href="#coal-navigation">Coal</a></li>';
          }
          if ($page['union_menu_links']) {
            print '<li><a class="box__link box__link--dk-blue" href="#union-navigation">Union</a></li>';
          }
          ?> 
        </ul>
      </nav>
    </section>
    <section class="header__tier" id="header-bottom">
    <?php
      if ($page['capita_menu_links']) {
        print '<nav class="header__navigation-bar" id="capita-navigation">
                <ul>';
                  c3_views_menu_links('menu-capita-menu-link');
                print '</ul>
              </nav>';
      }
      if ($page['union_menu_links']) {
        print '<nav class="header__navigation-bar" id="union-navigation">
                <ul>';
                  c3_views_menu_links('menu-union-menu-link');
                print '</ul>
              </nav>';
      }
      if ($page['coal_menu_links']) {
        print '<nav class="header__navigation-bar" id="coal-navigation">
                <ul>';
                  c3_views_menu_links('menu-coal-menu-links');
                print '</ul>
              </nav>';
      }
    ?>
    </section>
  </div>
</header>