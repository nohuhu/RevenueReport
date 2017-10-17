# RevenueReport

## Overview

This app demonstrates how to use Ext JS to build a single page Web application
for data visualization and manipulation. Server side is a simple Node.js
implementation that fetches sample data and keeps it in memory.

The client side is an universal Ext JS application combining Modern toolkit app
for tablet devices and Classic toolkit app for desktop browsers. This application
aims to utilize best practices and showcase data manipulation, MVVMC architecture,
data binding, using charts and grids, as well as unit testing parts of the app
in both toolkits.

## Server side

This part of the application is kept simple by intent. All it does by default is serving
RESTful(ish) requests from the client side, optionally adding static assets if
SERVE_STATIC environment variable is defined. This is mostly useful for debugging
the app locally when configuring full blown HTTP server with reverse proxying is not
desirable.

Upon startup the server will fetch sample data from a hardcoded URL, parse it and
store in internal array, adding a map by record it for speedier lookups. When
client sends CRUD requests, the data changes persist only until server restart.

## Client side

Browser side of the demo de facto consists of two separate applications built
with Classicn and Modern toolkits, respectively. This is done to showcase
best practices for supporting the widest range of client devices and platforms,
from IE8+ to mobile devices such as tablets. Most of the actual application code
is shared, with only a handful toolkit specific options added where necessary
but resulting production builds will be significantly different.

One of the key differences of Ext JS from other frameworks is that it allows
writing the whole application in JavaScript, using very minimal HTML markup
to bootstrap the application script. This allows for better component abstraction
and easier unit testing.

### Architecture overview

The client side consists of an Application instance, and a set of Views with
their respective ViewModels and ViewControllers. ViewModels in turn may own
data Stores and records.

The topmost View is Main, it is attached to the document body. Child views
are RevenueReport and Editor grid. Main view owns a ViewModel that in turn
owns a set of data Stores.

The most important of data Stores is the Revenue store that contains the whole
dataset requested from the server side; there are several sub-stores attached
to the Revenue store that will derive the data from it whenever Revenue store
is changed.

RevenueReport view, in turn, has its own ViewModel that owns data Stores
specific to the components in the RevenueReport. The data in these stores
is derived from the master Revenue store as well.

Editor grid view is very simple and does not have a ViewModel. It allows
manipulating raw data in Revenue store, with all changes automatically
synchronized with both server side and derived stores on the client side.

This approach allows for a single data synchronization point with minimal
network traffic between client and server, at the cost of slightly increased
resource consumption on the client for recalculating chained stores.

## Installation

TODO

