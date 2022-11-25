# _Project_ : FooDoo shop ( E-commerce )

_See project live :_ **[FooDoo-shop.com](https://apaltrow.github.io/foodoo-shop/#/)**

---

![](src/assets/readme-assets/attention1.png) **Attention!**

_`Application contains a registration stage, however, there is`_ **`a demo account available`** _`for your convenience!`_

## Access the demo account :

- At the login page click the **`'LOGIN WITH DEMO ACCOUNT'`** button

## About

_Online food store aimed to satisfy E-commerce business & customer's needs
with full cycle of customer's jorney starting from account creation and ending up with final order receipt._

_Adaptive and responsive design makes the application available on various devices such as desktop PCs, laptops, tablets and mobile phones._

_Intuitive and user friendly interface delivers the best UX._

![](src/assets/readme-assets/FooDooHeading.png)
![](src/assets/readme-assets/responsiveness.png)

## Tech Stack

| Side             | Tech                     | Icon                                      |
| ---------------- | ------------------------ | ----------------------------------------- |
| Front End        | React                    | ![](src/assets/readme-assets/React.png)   |
| Styles           | Sass / Scss _(modules)_  | ![](src/assets/readme-assets/Sass.png)    |
| State management | Redux / Tool Kit         | ![](src/assets/readme-assets/Redux.png)   |
| Server requests  | Axios / Redux AsyncThunk | ![](src/assets/readme-assets/server.png)  |
| Version control  | Git                      | ![](src/assets/readme-assets/Git.png)     |
| Back End         | MockApi                  | ![](src/assets/readme-assets/mockapi.png) |
| Deployment       | Github Pages             | ![](src/assets/readme-assets/github.png)  |
| Design           | Figma                    | ![](src/assets/readme-assets/figma.png)   |

## Detailed Overview

---

1.  _Authentication_ : **`Registration`**, **`Login`** pages.

---

- Forms validations _(with custom hooks)_

- Authentication check _(public and private routes with React Router + custom Auth HOC)_

- Login memory with local storage _(ability to use within multiple tabs)_

- Log out option _(with further re-authentication)_

- Demo account available.

## ![](https://lh4.googleusercontent.com/z1Xe3rhdjuzZOIh88cRCOvbtIVFTRQ3A_1Bci2hiYf6NROhAaq0xmoyPTHzYl_jhcNI=w2400)

## ![](https://lh4.googleusercontent.com/dcmX7rHou3heTGCyTfujdFuZZlmDp2wrhSa8fGTqLTDauUk7COg8FHQkjhHb7GN412o=w2400)

2.  _Mane_ : **`Home`** page.

---

- Navigation pannel with:

  - `Category sort`
  - `Sort by` _\*price_ _\*title_ _\*rating_
  - `Order sort` _\*ascending_ _\*descending_
  - `Input search `

- Catalog of the dish cards

- Single dish card with the ability to choose the size of the product and add to cart

- Dynamic indicator of the amount of the product added to the cart

- Product image contains a` link to Single Product page`

- Notification toast _( informing about successful addition )_

- Discount informer with percentage and discount price visualization

- Dynamic `Paggination`

## ![](https://lh4.googleusercontent.com/FZ8YWEMq_KU21JbNVQCh7if4yejVdwdhSGLAESirXCCsQ8_QrSl5r_8jrKTskNI8QuY=w2400)

---

3.  **`Single Product`** page.

---

- Adaptive `slider` for product photos visualization with dynamic paggination

## ![](https://lh4.googleusercontent.com/ZnCpfrajic7IXCyS7ZQoj64LYIO8yGY38B1yo5a5bRKY5gYd2-l3Jx6UHg4uIE0LNbk=w2400)

- `Product Reviews` section with user's rating and comment
  - Contains details about commenter and date
  - Has the ability to delete or edit previous comment _(in case you are the owner)_
- `Rate this product` functionality

  - Allows to rate and comment the product
  - Feedback will be recorded and saved to the Review section.

## ![](https://lh4.googleusercontent.com/Wr6EWwq3XgIY4zokd2LrG_lGlgiTLp60pUjLLcdwd6dIGFHwhRDtMDAKULAl-qmrLlo=w2400)

- Side menu contains informers about the product _( ex. Vegitarian friendly , Allergic sensitive notifiers )_

- `Ingredients overview` section

  - Dynamic weight indication for each size separately.
  - `Special order` option - provides the ability to customize the order _( exclude ingredients )_

## ![](https://lh6.googleusercontent.com/oxxkNqLjVUcSGeRSJD_BNiGPa-lWwkNfwEo03986nlXHGUJcMAVlYaeUpoxVBH1w1Jc=w2400)

- `Add to Favourites` option, allows to add the product of specific size and/or special order indication to your personal favourites list

## ![](https://lh6.googleusercontent.com/TQGrsNumgqYmtHHLiiFEnTbbo5-fMNYwKTCQAIyBBRWGD_26STyN8BmLFOtNFMfNu6I=w2400)

---

4.  **`Profile Settings`** page.

---

## ![](https://lh5.googleusercontent.com/Jw-x0-XpNbkAiz12IwGxU1RkyZqdXBwMIOMPLBbSFnYFndGy-iz7IVhy6eu68Iooa90=w2400)

- Update / change the Delivery Address.

## ![](https://lh5.googleusercontent.com/ghOBroJgO2aoJ_KlEsudhEuekmm1G6AHHfvpvNzYvT5P9eKQ7OHAUp_Xp0_T26czbqc=w2400)

- Edit the profile information _( first, last name, phone number )_

## ![](https://lh5.googleusercontent.com/EMPjqt25Ewe7uDEyrZdrA2PUKzkUuoCy1ao1SOHDIOfSyePjQG4-A5AET8uUMbJmUI0=w2400)

- Change password

---

5.  **`My Favourites`** page.

---

- Contains the list of the products _( of specific size or special order )_ for quick shopping

- Ability to quickly add the product to the cart

- Abiity to delete the product from your list

- Ability to navigate to the Single Product page

## ![](https://lh3.googleusercontent.com/1gpe5bpKJP1R-9AQP_mQWsPU_n20O3WvCsbLGemX0Wfc8D19vVydlhc2AKakpkrEwz8=w2400)

---

6.  **`Cart`** page.

---

`Cart Page - consists of 2 sections : Cart and Checkout`

- Cart :

  - Contains the catalog of the added products with information about the sizes, prices and type of the products as well as the special orders _( if applied )_

  - Side menu gives the ability to `increase / decrease` the amount and/ or `delete a specific product`.

  - Totals section contains` info` about the `total amount and cost` as well as the `discount saved` _( if applied )_

## ![](https://lh3.googleusercontent.com/-xm6GlEn_ydCdD8JJ_LRwl6EQzxN5ndc08kFsOakgJ0RSQVzCoUtnSp49b3DxpObyek=w2400)

- Checkout :

  - `Confirmation form` with the details about the recipient, delivery address, order check and total due.

  - `Pre-order section` : _( if applied )_ gives the ability to pick the pre-order date and time and `arrange a delayed delivery` _( contains `custom selects + calendar` )_

  - `Payment section `: provides the opportunity to pick if the order is payed with cash on delivery or straight away with card.

  - Card payment contains the form for (\*Mock ) payment processing by entering the card details.

  - Once the order is submitted, it is recorded and forwarded to _'My Orders page'_ automatically

## ![](https://lh3.googleusercontent.com/xTAP0NtPdGgSLDvpgbWzxWQU3I14q0XBWbGm3BfbaUBckpbUyi-Fc94gPl2NQzBzgMQ=w2400)

---

7.  **`My Orders`** page.

---

- Contains Recent orders section with the `overview of the previous orders` as well as the `current pending orders`

- Provides the ability to track the orders and find the details, see the status of the order

- My Orders section contains the `order processing widget` with animated status tracking if there is a pending order _( is not applied for pre-orders )_

## ![](https://lh4.googleusercontent.com/8BSz8_vbU0R4wUM7dmNMnaZwLKTtAFIixaalN_98WQ-b78VGUWQt6Uc05b7tRIdu9po=w2400)

## ![](https://lh5.googleusercontent.com/f_hfQS6KsZHqFeF_UFrMfv0dWY-6rRkdCryvNPJ9y1G-az2gEn6jSwCcIjqDDoGGLj8=w2400)

## ![](https://lh4.googleusercontent.com/qVKsEYTNnEKHfUE2QA0q9hqZNqAUUa4lp5Od_GT5rVmFDpykPEsU2UIX_x9IQLXGkhY=w2400)
