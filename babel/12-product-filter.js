//initiate
const product_filter = () => {
    const iso = new Isotope('.view-content', {
        itemSelector: '.product-category__card',
        percentPosition: true,
        layoutMode: 'fitRows'
    });

    //sort string of values
    const Sort = function(data_attr) {
            let product = document.querySelectorAll('.product-category__card'),
                sort_range = '',
                obj = {};

            for (let i = 0; i < product.length; i++) {
                let sort_string = product[i].getAttribute(data_attr);
                sort_range += sort_string;
            }

            let s = sort_range.split(" "),
                unsorted_array = [];

            s.forEach(function(key, value) {
                if (key != undefined && key != '') {
                    unsorted_array.push(key);
                }
            });

            obj.sort_array = function() {
                    //remove duplicates	
                    let arr = unsorted_array.filter(function(value, index, array) {
                        return array.indexOf(value) == index;
                    });

                    return arr.sort();
                },
                obj.last_item = function() {
                    return obj.sort_array()[obj.sort_array().length - 1];
                }

            return obj;
        },
        size = new Sort('data-size'),
        ride_type = new Sort('data-ride'),
        stiffness = new Sort('data-stiffness');


    //create form field values from sorted string
    const Create_form_values = function(value_array) {
        let obj = {};
        obj.option = function(classify = false, show_last = false) {
            let options;
            for (let i = 0; i < value_array.length; i++) {

            	if(value_array[i] != undefined || value_array[i] != null){
            		if(classify){
            			if(show_last){
            				if (i != (value_array.length - 1)) {
                                options += `<option value=".${value_array[i]}">${value_array[i]}</option>`;
                            } else {
                                options += `<option value=".${value_array[value_array.length - 1]}" selected>${value_array[value_array.length - 1]}</option>`;
                            }
            			}else{
            				options += `<option value=".${value_array[i]}">${value_array[i]}</option>`;
            			}
            		}else{
            			if (show_last) {
                        	
                            if (i != (value_array.length - 1)) {
                                options += `<option value="${value_array[i]}">${value_array[i]}</option>`;
                            } else {
                                options += `<option value="${value_array[i]}" selected>${value_array[i]}</option>`;
                            }

                        } else {
                            options += `<option value="${value_array[i]}">${value_array[i]}</option>`;
                        }
            		}
            	}
            }
            return options;
        }

        return obj;
    }

    let size_fields = new Create_form_values(size.sort_array()),
        ride_fields = new Create_form_values(ride_type.sort_array()),
        stiffness_fields = new Create_form_values(stiffness.sort_array());


    //create filter template & actions
    const Filter = function(form_fields) {
        //properties of a filter
        this.form_fields = form_fields;
    }

    Filter.prototype.create_template = function() {
        let self = this;

        let parent_element = document.querySelector('main'),
            new_element = document.createElement('div');

        new_element.id = "product-filter";
        new_element.className = 'user-menu__card';

        new_element.innerHTML += `
    	<div class="container">
	  		<div class="user-menu__card-section" id="product-filter-header">
	    		<a id="filter-btn" class="button__plain button__plain--primary" href="#">Product Filter</a>
	  		</div>
	  		<form id="filter-form">
		  		<div class="user-menu__card-section" id="product-filter-items">
					${self.form_fields}	
		    	</div>
		  	</form>
		  	<div class="user-menu__card-section" id="product-filter-footer">
		  		<a id="reset" class="button__plain button__plain--primary" href="#">Show All</a>
		  	</div>
		</div>
	`;

        parent_element.insertBefore(new_element, parent_element.firstChild);


        //open close filter
        let filter_btn = document.getElementById('filter-btn');
        filter_btn.addEventListener('click', function(event) {
            event.preventDefault();
            if (hasClass(new_element, 'product-filter-active')) {
                new_element.classList.remove('product-filter-active');
            } else {
                new_element.classList.add('product-filter-active');
            }
        });

        //reset form
        const reset = document.getElementById('reset'),
            radio_btn = document.querySelectorAll('input[type="radio"]');

        let cards = document.querySelectorAll('.product-category__card');

        reset.addEventListener('click', function(event) {
            event.preventDefault();
            for (let i = 0; i < radio_btn.length; i++) {
                radio_btn[i].checked = false;
            }
            radio_btn[0].checked = true;

            for (let i = 0; i < cards.length; i++) {
                cards[i].style.display = "block";
            }
            iso.arrange({
                filter: '*'
            });
        });
    }


    //capita 
    Filter.prototype.capita_submit = function() {
        let self = this,
            filter_form = document.getElementById('filter-form'),
            cards = document.querySelectorAll('.product-category__card');

        filter_form.addEventListener('change', function(event) {
            event.preventDefault();

            let price_fields = document.querySelectorAll('input[type="radio"]'),
                ride_val = event.currentTarget.ride_type.value,
                min_size_val = event.currentTarget.min_size.value,
                max_size_val = event.currentTarget.max_size.value,
                stock_val = event.currentTarget.product_status.value,
                min_size_index = size.sort_array().indexOf(min_size_val),
                max_size_index = size.sort_array().indexOf(max_size_val),
                val = '',
                price_val = "medium";

            for (let i = 0; i < price_fields.length; i++) {
                if (price_fields[i].checked === true) {
                    price_val = price_fields[i].value;
                }
            }


            for (let i = min_size_index; i < max_size_index + 1; i++) {
                if (i != max_size_index) {
                    val += `.${stock_val}.${ride_val}.${price_val}.${size.sort_array()[i]}, `;
                } else {
                    val += `.${stock_val}.${ride_val}.${price_val}.${size.sort_array()[i]}`;
                }
            }

            // use matching filter function
            iso.arrange({
                filter: `${val}`
            });
        });
    }

    let capita_form_fields = `
		<div class="form-group">
			<div class="group">
				<label class="label-full">Price</label>
				<div class="btn-group">
					<input id="any-price" type="radio" name="price" value="any-price" checked>
					<label for="any-price"></label> <span>All Price Ranges</span>
				</div>
				<div class="btn-group">
					<input id="very-low" type="radio" name="price" value="very-low">
					<label for="very-low"></label> <span>$100.00 or less</span>
				</div>
		  		<div class="btn-group">
		  			<input id="low" type="radio" name="price" value="low">
		  			<label for="low"></label> <span>$100.00 - $150.00</span>
		  		</div>
		  		<div class="btn-group">
		  			<input id="medium" type="radio" name="price" value="medium">
		  			<label for="medium"></label> <span>$150.00 - $200.00</span>
		  		</div>
		  		<div class="btn-group">
		  			<input id="high" type="radio" name="price" value="high">
		  			<label for="high"></label> <span>$200.00 - $250.00</span>
		  		</div>
		  		<div class="btn-group">
		  			<input id="very-high" type="radio" name="price" value="very-high">
		  			<label for="very-high"></label> <span>$250.00 - $300.00</span>
		  		</div>
		  		<div class="btn-group">
		  			<input id="max" type="radio" name="price" value="max">
		  			<label for="max"></label> <span>$300.00 or more</span>
		  		</div>
			</div>
			<div class="group">
				<div class="btn-group connected">
					<label for="min-size">Min. Size</label>		
					<select id="min-size" name="min_size">
						${size_fields.option(false, false)}
					</select>
				</div>
				<div class="btn-group">	
					<label for="max-size">Max. Size</label>		
					<select id="max-size" name="max_size">
						${size_fields.option(false, true)}
					</select>
				</div>
				<div class="btn-group">	
					<label for="ride-type">Ride Type</label>		
					<select id="ride-type" name="ride_type">
						<option value="any-ride-type" selected>Any</option>
						${ride_fields.option(false, false)}
					</select>
				</div>

				<div class="btn-group">	
					<label for="product-status">In Stock</label>
					<select id="product-status" name="product_status" >
						<option value="all-stock" selected>All Stock</option>
						<option value="in-stock">In Stock</option>
					</select>
				</div>
			</div>
		</div>		

`;

    const capita_filter = new Filter(capita_form_fields);


    //coal
    Filter.prototype.coal_submit = function() {
        let self = this,
            filter_form = document.getElementById('filter-form'),
            cards = document.querySelectorAll('.product-category__card');

        filter_form.addEventListener('change', function(event) {
            event.preventDefault();

            let price_fields = document.querySelectorAll('input[type="radio"]'),
                size_val = event.currentTarget.size.value,
                stock_val = event.currentTarget.product_status.value,
                price_val = "medium";

            for (let i = 0; i < price_fields.length; i++) {
                if (price_fields[i].checked === true) {
                    price_val = price_fields[i].value;
                }
            }

            iso.arrange({
                filter: `.${price_val}.${size_val}.${stock_val}`
            });

        });
    }

    let coal_form_fields = `
		<div class="form-group">
			<div class="group">
				<label class="label-full">Price</label>
				<div class="btn-group">
					<input id="any-price" type="radio" name="price" value="any-price" checked>
					<label for="any-price"></label> <span>All Price Ranges</span>
				</div>
				<div class="btn-group">
		  			<input id="low" type="radio" name="price" value="low">
		  			<label for="low"></label> <span>$25.00 or less</span>
		  		</div>
		  		<div class="btn-group">
		  			<input id="medium" type="radio" name="price" value="medium">
		  			<label for="medium"></label> <span>$25.00 - $50.00</span>
		  		</div>
		  		<div class="btn-group">
		  			<input id="high" type="radio" name="price" value="high">
		  			<label for="high"></label> <span>$50.00 - $75.00</span>
		  		</div>
		  		<div class="btn-group">
		  			<input id="max" type="radio" name="price" value="max">
		  			<label for="max"></label> <span>$75.00 or more</span>
		  		</div>
			</div>
			<div class="group">
				<div class="btn-group">
					<label for="size">Size</label>		
					<select id="size" name="size">
						${size_fields.option(false)}
					</select>
				</div>

				<div class="btn-group">	
					<label for="product-status">In Stock</label>
					<select id="product-status" name="product_status" >
						<option value="all-stock" selected>All Stock</option>
						<option value="in-stock">In Stock</option>
					</select>
				</div>
			</div>
		</div>		

`;
    const coal_filter = new Filter(coal_form_fields);

    //union
    Filter.prototype.union_submit = function() {
        let self = this,
            filter_form = document.getElementById('filter-form'),
            cards = document.querySelectorAll('.product-category__card');

        filter_form.addEventListener('change', function(event) {
            event.preventDefault();

            let price_fields = document.querySelectorAll('input[type="radio"]'),
                size_val = event.currentTarget.size.value,
                stock_val = event.currentTarget.product_status.value,
                stiffness_val = event.currentTarget.stiffness.value,
                price_val = "medium";

            for (let i = 0; i < price_fields.length; i++) {
                if (price_fields[i].checked === true) {
                    price_val = price_fields[i].value;
                }
            }

            console.log(`.${price_val}${size_val}.${stock_val}.${stiffness_val}`);

            iso.arrange({
                filter: `.${price_val}${size_val}.${stock_val}.${stiffness_val}`
            });

        });
    }

    let union_form_fields = `
		<div class="form-group">
			<div class="group">
				<label class="label-full">Price</label>
				<div class="btn-group">
					<input id="any-price" type="radio" name="price" value="any-price" checked>
					<label for="any-price"></label> <span>All Price Ranges</span>
				</div>
				<div class="btn-group">
					<input id="very-low" type="radio" name="price" value="very-low">
					<label for="very-low"></label> <span>$100.00 or less</span>
				</div>
		  		<div class="btn-group">
		  			<input id="low" type="radio" name="price" value="low">
		  			<label for="low"></label> <span>$100.00 - $150.00</span>
		  		</div>
		  		<div class="btn-group">
		  			<input id="medium" type="radio" name="price" value="medium">
		  			<label for="medium"></label> <span>$150.00 - $200.00</span>
		  		</div>
		  		<div class="btn-group">
		  			<input id="high" type="radio" name="price" value="high">
		  			<label for="high"></label> <span>$200.00 - $250.00</span>
		  		</div>
		  		<div class="btn-group">
		  			<input id="very-high" type="radio" name="price" value="very-high">
		  			<label for="very-high"></label> <span>$250.00 - $300.00</span>
		  		</div>
		  		<div class="btn-group">
		  			<input id="max" type="radio" name="price" value="max">
		  			<label for="max"></label> <span>$300.00 or more</span>
		  		</div>
			</div>
			<div class="group">
				<div class="btn-group">
					<label for="size">Size</label>		
					<select id="size" name="size">
                        <option value=".S">Small</option>
                        <option value=".M" selected>Medium</option>
						<option value=".L">Large</option>
					</select>
				</div>

				<div class="btn-group">
					<label for="stiffness">Stiffness</label>		
					<select id="stiffness" name="stiffness">
						<option value="loose_stiffness" selected>loose and surfy</option>
						<option value="medium_stiffness">medium flex</option>
						<option value="stiff_stiffness">stiff and responsive</option>
					</select>
				</div>

				<div class="btn-group">	
					<label for="product-status">In Stock</label>
					<select id="product-status" name="product_status" >
						<option value="all-stock" selected>All Stock</option>
						<option value="in-stock" selected>In Stock</option>
					</select>
				</div>
			</div>
		</div>		

`;
    const union_filter = new Filter(union_form_fields);


    if (hasClass(document.body, 'page-capita')) {
        capita_filter.create_template();
        capita_filter.capita_submit();
    }

    if (hasClass(document.body, 'page-coal')) {
        coal_filter.create_template();
        coal_filter.coal_submit();
    }

    if (hasClass(document.body, 'page-union') && !hasClass(document.body, 'page-union-all-parts')) {
        union_filter.create_template();
        union_filter.union_submit();
    }
}