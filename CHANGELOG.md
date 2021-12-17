# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
