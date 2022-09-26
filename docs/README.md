

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

| Example URL                                                   | Behavior                                                       |
|-------------------------------------------------------|----------------------------------------------------------------|
| https://mystore.com/product/p                         | Just a simple product URL                                      |
| https://mystore.com/product/p?targeting=affiliateName | URL with the parameter, will link this client to the affiliate |


6. If you want to change the parameter that will be used for the affiliate to share, you can edit the parameter property from the `Affiliate Monitoring` block inside the Site Editor.

![Parameter Editing](https://user-images.githubusercontent.com/53904010/191607498-a58c11ba-57f9-4d1c-aa65-b3d4c82c0c90.png)


> ℹ️ _After the affiliate send their URL for the client, their Affiliate ID will be linked to this client for some time and will be prioritized even if another Affiliate send an URL to the same client, the time the Affiliate ID usually persists is 60 days

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

## Email Template

For the export function to work properly and send an email for the user, it is needed to create a new template on the messafe center, based on the example below:

<img width="1224" alt="image" src="https://user-images.githubusercontent.com/53904010/192376163-1a0d427a-af57-463e-a9fc-2476a0794fc8.png">

#### HTML code example

```diff
  <!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="initial-scale=1.0">
    <!-- So that mobile webkit will display zoomed in -->
    <meta name="format-detection" content="telephone=no">
    <!-- disable auto telephone linking in iOS -->
    <title>{{_accountInfo.TradingName}}</title>
    <style type="text/css">
        p {
            font-family: Fabriga, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
        };
        .vtex-button {
            border-width: .125rem;
            border-style: solid;
            font-weight: 500;
            vertical-align: middle;
            padding: 0;
            line-height: 1;
            border-radius: .25rem;
            min-height: 2.5rem;
            box-sizing: border-box;
            font-family: Fabriga, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0;
            background-color: #134cd8;
            border-color: #134cd8;
            color: #fff;
            cursor: pointer;
        };
    </style>
</head>

<body marginwidth="0" marginheight="0" bgcolor="#fff" style="padding:0px 0px;color:#333;" leftmargin="0" topmargin="0">
    <!-- 100% wrapper (grey background) -->
    <table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" align="left" valign="top">
        <tbody>
            <tr>
                <td align="center" valign="top">
                    <table width="100%" style="max-width: 36rem;" align="center" cellpadding="0" cellspacing="0"
                        border="0" valign="top">
                        <tbody>
                            <tr>
                                <td>
                                    <div
                                        style="border:1px solid #e3e4e6;border-radius:8px;margin-top:1rem;margin-bottom:1rem;padding-top:3rem;padding-right:3rem;padding-bottom:3rem;padding-left:3rem">
                                        <img src="https://master--qamarketplace.myvtex.com/_v/public/assets/v1/published/vtex.messages-templates@0.1.12/public/react/cdbfb2a8b730a7ee840752d7af7ddc1c.png"
                                            width="77px" height="28px"
                                            style="display:block;outline:none;border:none;text-decoration:none"
                                            class="CToWUd">
                                        <p style="font-size:24px;color:#25354d;margin-bottom:32px">
                                            <strong>Planilha de pedidos de afiliados exportada</strong></p>
                                        <p style="font-size:16px;color:#3f3f40;margin-bottom:32px">
                                            Olá,</p>
                                        <p style="font-size:16px;color:#3f3f40">
                                            Segue o link para baixar a planilha pedidos de afiliados.
                                        </p>
                                        <div style="margin-bottom: 24px">
                                            <a href="{{link}}" download>
                                                <button
                                                    style="border-width: .125rem; border-style: solid; font-weight: 500; vertical-align: middle; padding: 0; line-height: 1; border-radius: .25rem; min-height: 2.5rem;  box-sizing: border-box; font-family: Fabriga, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;  font-size: 1rem;  text-transform: uppercase;  letter-spacing: 0; background-color: #134cd8; border-color: #134cd8;  color: #fff; cursor: pointer;"
                                                    type="button">
                                                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 0.25rem; padding-bottom: 0.25rem;">
                                                        Baixar Planilha
                                                    </div>
                                                </button>
                                            </a>
                                        </div>
                                        <p style="margin-bottom:4px;font-size:16px;color:#3f3f40">
                                            Abraços,</p>
                                        <p style="margin-top:0px;font-size:16px;color:#3f3f40">
                                            VTEX</p><br>
                                        <p style="font-size:12px;color:#727273;margin-bottom:0px">
                                            O link para download é válido por 24 horas. Após esse tempo, será necessário realizar a exportação novamente.
                                        </p>
                                        <div
                                            style="color:#e3e4e6;border-top:1px solid #e3e4e6;border-bottom:0px solid #e3e4e6;margin-bottom:2rem;margin-top:1rem">
                                        </div>
                                        <p style="font-size:12px;color:#727273;margin-bottom:0px">
                                            Esse email é enviado automaticamente e não recebe respostas.
                                        </p>
                                        <p style="font-size:12px;color:#727273;margin-top:.25rem;margin-bottom:0px">
                                            Precisa de ajuda? <a href="https://help.vtex.com/?locale=pt" alt="VTEX Help"
                                                style="font-weight:bold;color:#3F3F40">Fale Conosco</a>
                                        </p><br>
                                        <p style="font-size:12px;color:#727273;margin-bottom:0px">
                                            © VTEX Praia de Botafogo, 300, 3º Andar, Botafogo, Rio de Janeiro, RJ,
                                            22250-040
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <!--/600px container -->
    <!--/100% wrapper-->
</body>
</html>

```
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


