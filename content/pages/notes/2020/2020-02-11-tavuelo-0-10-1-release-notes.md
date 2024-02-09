---
title: Tavuelo 0.10.1 release notes
date: 2020/02/11
category: tavuelo, devlog
tags: tavuelo, vue, vue.js, devlog, open source, table, data table, component, javascript, js, programming, release notes, changelog
active: 2
---

> Tavuelo is my first open source package. It is a easy to use yet highly customizable table component, created for use in Vue.js projects.

# Changelog

Finally added handling `slot` blocks for table cells. You can use it to define custom template inside each column or when you want to display something extra when there is no data in the table (for example a nice image). Since the beginning this was the biggest feature that has been waiting to be implemented.

If you don't want to control empty table message via slot, you can change the default `No data` text by setting it to other string via `noDataLabel` tavuelo component property.

Sometimes you want to use in your table totally custom columns, that shows computed data (e.g. when using mentioned slot-based column cell templates) but how to handle sorting and filtering for such columns? Well, tavuelo does that for you via new `computedValue` column property.

Added new properties:

- `noDataLabel` - a string prop (default value: `No data`) - it is displayed when there's no data in the table available (or because of applied filter/search)

- `useNoDataSlot` - a boolean prop (default value: `false`) - toggle usage of slot block that will be visible when there won't be any results available (or again, because of applied filter/search). It automatically overrides the label string set via `noDataLabel` property.
Example of the slot:
```
<template slot='noDataSlot'>
  <img src="/images/no-data.jpg" alt="no data" class="block--centered" />
  <p class="text--red text--centered">There is no data here!</p>
</template>
```

Column definition new properties and changes:

- `type` prop has new available value: `slot` - it determines if tavuelo should use default cell templates or slots. To use cell slots properly, it requires also to set value to `slotName` property

- `slotName` - a string property that contains template name that will be used for this column slot. Template also uses as a `slot-scope` current row object, represented by `entry` variable. Example column slot template code:

```
<template slot='fullName' slot-scope='{entry}'>
  {{ entry.first_name }} {{ entry.last_name }}
</template>
```

- `computedValue` - a function that uses current row as an argument, used to compute value for custom columns. As a most basic example we can use a column that contains full name, with values represented by following code:

```
{
  title: 'Full name',
  dataSource: 'fullName',
  type: 'slot',
  slotName: 'fullName',
  computedValue: row => `${row.first_name} ${row.last_name}`
}
```

This value will be used when sorting and filtering, only if there's no such data source available in data set that is used in the table (so if there's already `full_name` data in each record of the data set, it will be used instead of this computed value)

Besides above changes, example components code and readme file has been updated as well. You can check it [here](https://www.npmjs.com/package/tavuelo) and customize table code with newly added properties. You can also clone package repository to your machine, and run the example mini-project easily via `npm run serve` command.

[Link to npm](https://www.npmjs.com/package/tavuelo)

[Link to github](https://github.com/lukaszkups/tavuelo)

-- ł.
