

# Affiliates

The affiliates app adds some data layer and pages that will allow your store to work with a partner structure, this app will give the affiliates a page and url parameter for them to share with their clients, and when something is bought they will have a commission related to their clients purchase.
The app also adds some configurations and management pages for the store owner and affiliate as well.

![Here comes an example of the store affiliate page]()<br/>
_**Example of an affiliate page**_<br/>
This is the main page that will be shared by the affiliate with their clients, it's a page that can be customized to show some products and guide the customer.

![Here comes an example of the store affiliate profile page]()<br/>
_**Example of the affiliate profile page**_<br/>
This is the page where the affiliate can see their information that is registered on the store.

![Here comes an example of the store affiliate management page]()<br/>
_**Example of the affiliate management page**_<br/>
This is the page where the affiliate can see the orders related to their account, with a totalizer and dashboard for a better experience.

![Here comes an example of the store affiliate form page]()<br/>
_**Example of the affilate form**_<br/>
This page contains a form that can be filled by anyone that wants to became an affiliate

## Configuration

1. Search for the Affiliate app on our app store and install it on your account.
2. Open your store's Store Theme app directory in your code editor.
3. Add the Affiliates app to your theme's `manifest.json` file inside **peerDependencies** as shown below:

```diff
 "peerDependencies": {
+  "vtex.affiliates": "1.x"
 }
```

> ℹ️ _The Affiliates app can export several theme blocks when added as a dependency. There are some that are responsible for creating several different pages on the storefront, like `affiliate`, `affiliate-profile` and `affiliate-form`, and there are several functionality blocks that will be used within these pages context as well, we will show more about them on the advanced section._

3. After installing the app, the main pages will be available with a default layout, you can access them by `/affiliates/:slug` and `/affiliates/profile/:slug`

4. If you want your affiliates to have the possibility to send any URL of the site for the client, you will have to add the `affiliate-url-monitoring` block into the header of your theme as shown below:

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

> ℹ️ _The `affiliate_url_monitoring` app adds a logic that will seek for specific parameter on the URL, if the parameter is found with a valid affiliate slug as it's value, it will add the affiliate informations on the purchase.

5. Now your affiliate can send any URL with the parameter **targeting** with their slug as value, it will adds this affiliate information to be linked to the purchase

6. If you want to change the parameter that will be used for the affiliate to share, you can edit the parameter property from the `Affiliate Monitoring` block inside the Site Editor.

![Parameter Editing](https://user-images.githubusercontent.com/53904010/191607498-a58c11ba-57f9-4d1c-aa65-b3d4c82c0c90.png)

## Advanced configurations

According to the Affiliate app composition, the `/affiliates/:slug` page can be highly customizable using other blocks. Currently, its default implementation is as follows:

`store.affiliates` interface for the route `/affiliates/:slug`, `store.affiliates-profile` for the route `affiliates/profile/:slug`, and `store.affiliate-form` for the route `affiliate/form`.

**store.affiliates**

```json
{
  "store.affiliates": {
    "blocks": ["affiliate-validator"]
  },

  "affiliate-validator": {
    "props": {
      "Valid": "affiliate-template",
      "Invalid": "affiliate-invalid-template"
    }
  },

    "affiliate-template": {
    "children": [
      "affiliate-store-name",
      "flex-layout.row#banner",
      "affiliate-profile-button",
      "search-result-layout.customQuery#affiliate"
    ]
  },

  "flex-layout.row#banner": {
    "children": ["image#affiliate-banner"]
  },

  "image#affiliate-banner": {
    "props": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/VTEX_Logo.svg/400px-VTEX_Logo.svg.png"
    }
  },

  "search-result-layout.customQuery#affiliate": {
    "props": {
      "querySchema": {
        "skusFilter": "ALL_AVAILABLE",
        "simulationBehavior": "default",
        "queryField": "137",
        "mapField": "productClusterIds",
        "facetsBehavior": "Dynamic"
      }
    },
    "blocks": [
      "search-result-layout.desktop",
      "search-result-layout.mobile",
      "search-not-found-layout"
    ]
  }, 

  "affiliate-invalid-template": {
    "children": ["rich-text#invalid-affiliate"]
  },

  "rich-text#invalid-affiliate": {
    "props": {
      "textAlignment": "CENTER",
      "textPosition": "CENTER",
      "text": "**Affiliate does not exist or has not been approved**",
      "font": "t-heading-1"
    }
  }


}
```

**store.affiliates-profile**

```json
{
  "store.affiliates-profile": {
    "children": ["affiliate-profile"]
  },

  "affiliate-profile": {
    "children": ["affiliate-profile-topbar", "affiliate-profile-validator"]
  },

  "affiliate-profile-validator": {
    "props": {
      "Valid": "flex-layout.row#profile",
      "Invalid": "rich-text#profileerror"
    }
  },

  "rich-text#profileerror": {
    "props": {
      "text": "### Faça o login com a conta correta do afiliado para acessar as informações",
      "textAlignment": "CENTER",
      "textPosition": "CENTER"
    }
  },

  "flex-layout.row#profile": {
    "children": ["flex-layout.col#profile"]
  },

  "flex-layout.col#profile": {
    "children": [
      "affiliate-profile-title",
      "affiliate-profile-totalizer",
      "affiliate-profile-table"
    ]
  },

}
```

**store.affiliate-form**

```json
{
  "store.affiliate-form": {
    "children": ["affiliate-form"]
  }
}
```


By "default implementation" we mean that, by installing the Affiliate app in your store, you're actually using the `jsons` above behind the scenes to build the new pages.

Therefore, in order to customize these pages configuration, you should:

1. Create a `affiliates.jsonc`, `affiliates-profile.jsonc` or `affiliates-form.jsonc` file under `store/blocks`.
3. Copy the code above, paste it in the new file and change it as you wish.
4. Deploy your changes.

## Props

There a two specific component types with props that must be configured to work properly.

#### `affiliate-validator` and `affiliate-profile-validator` props

| Prop name |   Type   |                            Description                               |         Default value           |
| :-------: | :------: | :------------------------------------------------------------------: | :-----------------------------: |
|  `valid`  | `string` |  Set the block name that will be rendered if the affiliate is valid  |     `affiliate-template`        |
| `invalid` | `string` | Set the block name that will be rendered if the affiliate is invalid |  `affiliate-invalid-template`   |

#### `affiliate_url_monitoring` props

| Prop name |   Type   |                            Description                                    |    Default value    |
| :-------: | :------: | :-----------------------------------------------------------------------: | :-----------------: |
|`parameter`| `string` | Parameter name that will be used to validate the URL the affiliate shared |     `targeting`     |

## Customization

In order to apply CSS customizations to this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles             |
| ----------------------- |
| `affiliateStoreName`    |
| `affiliateProfileTitle` |
| `profileButtonContainer`|

<!-- DOCS-IGNORE:start -->

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->


