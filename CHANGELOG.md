# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
