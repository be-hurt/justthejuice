Recipes.find(function(err, recipes){
    if(err) return console.error(err);
    if(recipes.length) return;

    new Recipes({
        recipe_name: 'Mocha',
        user: 'Britt',
        category: 'Coffee',
        rating: 3,
        description: 'This is a chocolate and coffee-lover\'s favorite! Using a home espresso machine, mix espresso, chocolate, and steamed milk--then top with whipped cream.',
        ingredients: ['1 1/4 cups 2% milk', '1 (1.5 fluid ounce) jigger brewed espresso', '2 tablespoons chocolate syrup', '1 tablespoon sweetened whipped cream (optional)'],
        steps: ['Pour milk into a steaming pitcher and heat to 145 degrees F to 165 degrees F (65 to 70 degrees C) using the steaming wand.', 'Measure the chocolate syrup into a large coffee mug.', 'Brew espresso, then add to mug.', 'Pour the steamed milk into the mug, using a spoon to hold back the foam. Top with whipped cream.'],
        notes: [],
        image: ''
    }).save();

    new Recipes({
        recipe_name: 'Tropical Smoothie',
        user: 'Britt',
        category: 'Smoothies',
        rating: 3,
        description: 'A quick and easy tropical flavoured smoothie. Makes one 500ml smoothie.',
        ingredients: ['1/2 cup Pineapple juice', '1/2 cup orange juice', '2-3 tbsps Vanilla Yogurt', '3/4 cup Frozen Tropical Fruit Blend'],
        steps: ['Pour both juices into a blender.', 'Spoon in the vanilla yogurt.', 'Add the fruit. Blend on high or pulse until mixture is smooth.'],
        notes: ['Make sure to add the liquid first! If your blender isn\'t very good, the frozen fruit could break it otherwise.'],
        image: ''
    }).save();

    new Recipes({
        recipe_name: 'Chai Tea Latte',
        user: 'Britt',
        category: 'Tea',
        rating: 3,
        description: 'A simple chai latte recipe. Great for cold days!',
        ingredients: ['2 black tea bags', '1 tsp ground cinnamon', '1/2 tsp ground ginger', '1/4 tsp ground allspice', '1 cup water', '1 cup milk', '2-3 tbsps packed brown sugar', '2 tbsps half-and-half cream', '1/2 tsp vanilla extract'],
        steps: ['Place the tea bags, cinnamon, ginger and allspice in the coffee filter of a drip coffeemaker. Add water; brew according to manufacturer\'s directions.', 'Meanwhile, in a small saucepan, combine the milk, brown sugar, cream and vanilla. Cook and stir over medium heat until heated through and sugar is dissolved. Pour milk mixture into mugs; stir in tea. Dollop with whipped topping and sprinkle with nutmeg if desired.'],
        notes: [''],
        image: ''
    }).save();

    new Recipes({
        recipe_name: 'Mexican Spiced Hot Chocolate',
        user: 'Britt',
        category: 'Hot Chocolate',
        rating: 3,
        description: 'A simple recipe for homemade hot chocolate with some delicious Mexican spices added in.',
        ingredients: ['4 cups milk', '1/4 cup unsweetened cocoa powder', '1/4 cup sugar', '2 tsp. cornstarch (optional thickener)', '1 tsp cinnamon', '1/2 tsp. vanilla extract', '1/4 tsp. chipotle powder or chili powder', 'pinch of nutmeg', 'pinch of cayenne', 'optional toppings: whipped cream, marshmallows, chocolate syrup, and/or chocolate shavings'],
        steps: ['Add all ingredients to a medium saucepan.  Heat over medium heat until simmering, stirring frequently. ', 'Remove from heat and serve with optional toppings.'],
        notes: [''],
        image: ''
    }).save();

    new Recipes({
        recipe_name: 'Virgin Strawberry Daiquiri',
        user: 'Britt',
        category: 'Mocktails',
        rating: 3,
        description: 'An excellent summer drink for when you want the daiquiri without the alcohol.',
        ingredients: ['2 tbsps of fresh lime juice', '1/2 cup fresh strawberries', '1 tbsp white sugar', 'Cracked ice'],
        steps: ['Fill your blender with the cracked ice. Add the lime juice, strawberries and sugar and blend until completely smooth. Add water if mixture is too thick.', 'When you\'re finished, pour the drink into a chilled glass and garnish it with a fresh strawberry.'],
        notes: ['If you would prefer to cut down on the sugar, substitute with 1 tsp sugar and a tbsp apple juice or white grape juice for added flavour'],
        image: ''
    }).save();

});
