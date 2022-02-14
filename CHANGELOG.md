# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
