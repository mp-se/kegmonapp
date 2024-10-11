![download](https://img.shields.io/docker/pulls/mpse2/kegmonapp)
![release](https://img.shields.io/github/v/release/mp-se/kegmonapp?label=latest%20release)
![issues](https://img.shields.io/github/issues/mp-se/kegmonapp)
![pr](https://img.shields.io/github/issues-pr/mp-se/kegmonapp)

# KegMonApp - Companion app for kegmon

This is an addon for the Kegmon project. This acts as an installable web application (PWA) that can fetch and display data from any kegmon installation and from Brewfather.

> Requires Kegmon v1.0 or newer.

The application is shipped as a docker image to allow for installation or access. Refer to: https://hub.docker.com/repository/docker/mpse2/kegmonapp/general

> Due to security limitation in all browsers the installation needs to be done via http:// since kegmon does not support SSL. Its not allowed to install the app via SSL and then access non SSL resources, all browsers will block this attempt. This might be adressed in future release using a webserver as the proxy.

# Features

- Web based dashboard on any device based where data is fetched from the kegmon device. This will allow for a larger screen than the oled / lcd options.
- Can be installed as an app via the browser (using PWA, Portable Web Application standard).
- Show an inventory of your beers from Brewfather.
- All data is stored on the local browser.

# Brewfather integration

The brewfather integration will fetch your finished brews and list them on a page (they will be displayed in brew order, newest on top). Only brews marked completed will be fetches and displayed.

This is the data that is fetched and shown on the dashboard.

- name: Default would be batch so in that case the _recipe.name_ is used.
- tasteNotes: Description of the beer in the list.
- recipe.style: Style of beer.
- recipe.color: EBC color, will also be used to select the appropriate image.
- recipe.ibu: IBU
- recipe.abv: ABV

You don't need to enter the brewfather secrets on the device. If these are defined on the kegmon device these will be fetched and stored when the index.html page is opened and they are unset.

# History

- v1.0 Rewritten in vuejs and supports v1.0 or newer
- v0.4 Adding brewfather inventory integration.
- v0.3 Some refactoring to prepare tap list integration
- v0.2 Added more layout options for the dashboard
- v0.1 First prototype
