

# Affiliates

The affiliates app adds some data layer and pages that will allow your store to work with a partner structure, this app will give the affiliates a page and slug for them to share with the client, and when something is bought they will have a commission related to this purchase.
The app also adds some configurations and management pages for the store owner and affiliate aswell.

![Here comes an example of the store affiliate page]()<br/>
_Example of an affiliate page that can be shared with the clients._

![Here comes an example of the store affiliate profile page]()
_Example of the affiliate profile page_

![Here comes an example of the store affiliate management page]()
_Example of the affiliate management page_

![Here comes an example of the store affiliate form page]()
_Example of the affilate form that will allow people interested in being an affiliate to register_

## Configuration

1. [Install](https://vtex.io/docs/recipes/development/installing-an-app/) the Affiliate app in the desired VTEX account by running `vtex install vtex.affiliates` in your terminal.
2. Open your store's Store Theme app directory in your code editor.
3. Add the Affiliates app to your theme's `manifest.json` file inside **peerDependencies** as shown below:

```diff
 "peerDependencies": {
+  "vtex.affiliates": "1.x"
 }
```

> ℹ️ _The Affiliates app can export several theme blocks when added as a dependency. They are responsible for creating several different pages on the storefront, `affiliate`, `affiliate-profile` and `affiliate-form`, and there are several functionality blocks that will be used within this context aswell, we will show them on the advanced section._

3. After installing the app, the main pages will be available with a default layout, you can access them by `/affiliates/:affiliate-slug` and `/affiliates/profile/:affiliate-slug`

4. If you want your affiliates to have the possibility to send any product URL for the client, you will have to add the `affiliate-url-monitoring` block into the header of your theme as shown below:

```diff
  "header-layout.desktop": {
    "children": [
+     "affiliate-url-monitoring",
      "flex-layout.row#1-desktop",
      "flex-layout.row#3-desktop",
    ]
  },

    "header-layout.mobile": {
    "children": [
+     "affiliate-url-monitoring",
      "flex-layout.row#1-desktop",
    ]
  },
```

> ℹ️ _The `affiliate_url_monitoring` app adds a logic that will seek for specific parameter on the URL, if the parameter is found with a valid value, it will add the affiliate informations for this purchase. The default parameter is **targeting**

5. Now your affiliate can send any product URL with the parameter **targeting** with their slug value, it will adds this affiliate information to be linked to the purchase

6. If you want to change the parameter that will be used for the affiliate share, you can edit the parameter property from the `URL Monitoring` block inside the Site Editor.

!(Parameter Editing)[https://user-images.githubusercontent.com/53904010/191607498-a58c11ba-57f9-4d1c-aa65-b3d4c82c0c90.png]

## Advanced configurations


