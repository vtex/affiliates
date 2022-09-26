# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.1] - 2022-09-26

### Added

- DOCs adjustments

## [1.3.0] - 2022-09-26
### Added

- Error message component created
- Toast Provider added to the StoreFront component
- Form adjustments

### Added

- Scroll on affiliates
- Send all affiliates to export orders via new variable in the query

## [1.2.1] - 2022-09-22

### Added

- README adjustments

## [1.2.0] - 2022-09-21

## [1.1.0] - 2022-09-21

## [1.0.0] - 2022-09-21

### Added

- Billing options at manifest

### Changed

- Status label message of affiliates orders table

## [0.61.1] - 2022-09-12

### Added

- Loading spinner to edit page
- Loading to names on the affiliates orders table

## [0.61.0] - 2022-09-02

## [0.60.0] - 2022-09-01

### Added

- Storefront form logic added to create a new Affiliate

### Added

- Base Form element to be added on the store-front

### Added

- URL Monitoring Site Editor config and Props added

### Added

- Affiliate Monitoring URL component, logic and block created

## [0.59.0] - 2022-08-31

### Added

- Affiliate name column to the orders table
- Combobox suggestions via dictionary

## [0.58.1] - 2022-08-25

### Added

- Added the "Not Mapped" status to the affiliate orders table

## [0.58.0] - 2022-08-25

### Changed

- Added the `Combobox` component to the affiliate orders page
- Changed the orders filter to work with the `Combobox` values

## [0.57.3] - 2022-08-24

### Changed

- update `admin-ui` version to `0.132.7`
- `Set` component to `Stack`
- `DataGrid` component to `Table`
- `PageTitle` and `PageActions` component to `PageHeaderTitle` and `PageHeaderActions`
- `Toggle` component to `Swtich`
- update on `Button` component
- remove prop key on `createSystem`
- changed `Search` state to `value`, `onChange` and `onClear` props
- `Tooltip` label to text

## [0.57.2] - 2022-08-18

## [0.57.1] - 2022-08-09

### Fixed

- Fixed block structure

## [0.57.0] - 2022-08-09

### Added

- Component `ProfileModal` added
- Hook `UseDisclosure` added
- Some messages added to the StoreMessage utils

## [0.56.1] - 2022-08-08

### Changed

- Status filters values to match the status enum

## [0.56.0] - 2022-07-27

### Added

- Minimum table size for the profile
- Table empty state
- Filter by orderId, status and date for the profile table
- `notifyOnNetworkStatusChange` prop to the affiliateOrders query

## [0.55.0] - 2022-07-22

### Added

- Created and added the `Tooltip` component to be used inside `Totalizer`

## [0.54.0] - 2022-07-18

### Added

- Created and added the `ProfileValidator` component and `profile-validator` block

## [0.53.1] - 2022-07-13

### Fixed

- DatePicker on order Table now have a time to pick to be able to use 1 day range

### Changed

- `Last update Date` column of orders table to `Order Date`

## [0.53.0] - 2022-07-12

### Added

- `Topbar` logo site editor config

## [0.52.0] - 2022-07-11

### Fixed

- Component `AffiliateProfile` added
- Structure adjustments for the `Totalizer`, `Table` and `Topbar` components
- Table measure fix

## [0.51.0] - 2022-07-07

### Added

- Affiliates graphQL to `AffiliateOrdersTable` to get the `affiliateId`'s to get the orders

## [0.50.1] - 2022-07-05

### Fixed

- Added missing filtering option, payment-pending

## [0.50.0] - 2022-07-05

### Added

- Order Table added to the Affiliate Profile Page
- Components Added `ProfileTable` and `ProfileStatusTag`
- Hooks added `usePagination` and `useProfileTable`

## [0.49.0] - 2022-06-21

### Added

- Totalizer Block based on the context and graphQL return
- Profile Title Block added

### Changed

- Taken the date out of the storefront context because it is not going to be a filter on the page and it helps return all the orders data

## [0.48.0] - 2022-06-15

### Added

- Logout button

### Changed

- Avatar component to be a button and have a dropdown menu

## [0.47.0] - 2022-06-03

### Added

- Create Avatar component
- Create profile Top Bar

## [0.46.2] - 2022-06-01

### Fixed

- Add ID field to Affiliates table search feature
- Add payment-pending status to Orders table

## [0.46.1] - 2022-05-18

### Added

- Date filter to getAffiliatesOrders query to the current month in the provider

## [0.46.0] - 2022-05-12

### Added

- getAffiliatesOrders query to the context
- Save the affiliate data to the context

## [0.45.0] - 2022-05-04

### Added

- getAffiliateByEmail query
- New route in stores for the affiliate profile (/affiliates/:affiliateId/profile)
- affiliate profile block

### Removed

- Boilerplate route

## [0.44.5] - 2022-03-23

### Changed

- Fix some hardcoded strings
- Update order status UI inside the order details page

## [0.44.4] - 2022-03-21

### Added

- Link for the oms order in the affiliates orders table
- Slug and ref id fields to the affiliate details page
- Total order value disclaimer tooltip

### Changed

- Update totalizers UI
- Refetch the last uploaded file after a new upload

## [0.44.3] - 2022-03-16

### Changed

- Change commissions tab order
- Update last uploaded file UI logic to consider when no file was uploaded

## [0.44.2] - 2022-03-14

### Added

- Add css handles to the affiliate store name block

## [0.44.1] - 2022-03-10

## [0.44.0] - 2022-03-10

### Added

- Totalizers area for the affiliate orders table
- Totalizers variable to affiliatesOrders query

## [0.43.0] - 2022-03-10

### Added

- Last imported commission file information and download link

## [0.42.0] - 2022-03-08

### Added

- Button to affiliate orders in the affiliate details page

## [0.41.0] - 2022-03-08

### Added

- Affiliate orders table filters to the querystring

## [0.40.0] - 2022-03-07

### Added

- Status filter to the affiliates orders table
- Actions to the affiliates orders table

### Changed

- Change status cell UI to be more user friendly
- Remove row click on affiliates orders table

## [0.39.1] - 2022-03-04

## [0.39.0] - 2022-03-04

### Added

- Add actions column to commissions table
- Add actions column to affiliates table

### Changed

- Remove row click action on commissions table
- Remove row click action on affiliates table

## [0.38.1] - 2022-03-04

### Changed

- Add affiliate button position to page header
- Edit affiliate button position to page header

## [0.38.0] - 2022-02-25

### Added

- File example for the commissions import

## [0.37.1] - 2022-02-25

### Changed

- Update messages
- Fix select UI

## [0.37.0] - 2022-02-25

### Added

- slug property to the Affiliates masterdata schema

### Updated

- changed all affiliates GraphQL and service routes to use the new slug property

## [0.36.0] - 2022-02-21

### Added

- Page to add a new affiliate

## [0.35.0] - 2022-02-18

### Added

- Affiliate form
- Affiliate edit page

## [0.34.0] - 2022-02-17

### Added

- Action to the approve affiliate toggle

## [0.33.0] - 2022-02-16

### Added

- Affiliates management page

## [0.32.0] - 2022-02-14

### Added

- Affiliate detail page

## [0.31.0] - 2022-02-14

### Added

- getAffiliate query

## [0.30.0] - 2022-02-11

### Added

- updateAffiliate mutation

## [0.29.0] - 2022-02-10

### Added

- addAffiliate mutation

## [0.28.0] - 2022-02-08

### Added

- getAffiliates query

## [0.27.0] - 2022-02-08

### Added

- Import commissions by file

## [0.26.0] - 2022-02-04

### Added

- Export action to the affiliates orders table

## [0.25.0] - 2022-02-03

### Added

- Export action to the commissions table

## [0.24.0] - 2022-02-03

### Added

- Edit commission action on row click
- Edit comission modal

## [0.23.1] - 2022-01-28

## [0.23.0] - 2022-01-28

### Added

- Add commissions table

### Changed

- Add a resolver to the orderItems table to show the commission with %

## [0.22.0] - 2022-01-26

### Added

- Row click action to the affiliates orders table
- Order details page

## [0.21.0] - 2022-01-26

### Added

- Add affiliates orders table to dashboard section

## [0.20.1] - 2022-01-19

### Added

- Add initial admin development

## [0.20.0] - 2022-01-17

### Updated

- setAffiliateOnOrderForm mutation to respond with the mutated orderform
- AffiliateValidator component to update OrderFormContext with customData after mutation

## [0.19.0] - 2022-01-14

### Added

- Default commission value to app settings
- Affiliate commission service as a dependecy

## [0.18.1] - 2021-12-22

### Fixed

- Service middleware unit tests after changes on implementation

## [0.18.0] - 2021-12-22

### Added

- vtex.affiliates-order-form-spy@0.x as a dependency

### Updated

- verifyUserAffiliateLead to handle a service call instead of an event

## [0.17.0] - 2021-12-21

### Added

- Affiliate store name block

## [0.16.0] - 2021-12-20

### Changed

- Update default Affiliate Store Template

## [0.15.0] - 2021-12-17

### Added

- Default value to leadDurationInDays

## [0.14.0] - 2021-12-17

## Added

- Changed data entity being used to store Affiliate Lead from CL to a new entity.

## [0.13.0] - 2021-12-13

### Added

- authenticate client
- authenticateRequest middleware
- authenticateRequest middleware to the affiliate route

## [0.12.0] - 2021-12-08

### Changed

- Affiliates MD schema

## [0.11.0] - 2021-12-07

### Added

- Middlewares for handling the verifyUserAffiliateLead event

### Fixed

- setAffiliateOnOrderForm mutation being called too son on AffiliateValidator

## [0.10.0] - 2021-12-06

### Added

- validateLead, updateLead and getClient middlewares
- Affiliate id to context state inside the validadeCustomData middleware

## [0.9.0] - 2021-11-30

### Added

- Listener for the payment-approved event on order
- getOrder and validateCustomData middlewares

## [0.8.0] - 2021-11-19

### Added

- Use setAffiliateOnOrderForm mutation when accessing a valid affiliate page

## [0.7.0] - 2021-11-19

### Added

- setAffiliateOnOrderForm mutation

## [0.6.0] - 2021-11-18

### Added

- AffiliateValidator storefront block
- affiliate_layout store template
- affiliate_invalid store template

## [0.5.0] - 2021-11-18

### Added

- onAppInstalled event handler to configure the app

## [0.4.0] - 2021-11-18

### Added

- Add isAffiliateValid query

### Changed

- Update middlewares to consider if affiliate param is undefined

## [0.3.0] - 2021-11-16

### Added

- Update affiliate route

## [0.2.0] - 2021-11-11

### Added

- Create affiliate route

## [0.1.0] - 2021-11-09

### Added

- Affiliates entity to the masterdata
