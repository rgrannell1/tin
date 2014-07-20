#!/usr/bin/env node

const docopt = require("docopt").docopt
const is     = require('is')

const docs = [
	"Usage:",
	"    tin <first> <unit0>",
	"    tin <first> <unit0> in <unit1>",
	"    tin <first> <unit0> <second> <unit1>",
	"    tin <first> <unit0> <second> <unit1> in <unit2>",
	"",
	"    tin (-h | --help | --version)",
	"",
	"Description:",
	"",
	"Tin computes time intervals.",
	"",
	"",
	"Options:",
	"    -h --help        Show this documentation.",
	"    --version        Show the current version",
	"",
	"Tin computes time intervals."
].
join('\n')





/*
	tin :: [string | null] x [string | null] x boolean -> string



*/

const args   = docopt(docs)

const tin = ( function () {

	const validate = {
		times: function (times) {

			return times
				.filter(function (time) {
					return !is.null(time)
				})
				.map(function (time) {

					var quantity = parseFloat(time, 10)

					if (quantity !== quantity) {

						const message =
							"The time quantity '" + time +
							"' could not be parsed as a float."

						throw TypeError(message)
					}

					return quantity

				})

		},
		units: function (units) {

			const isValidUnit =
				/second[s]|sec[s]*|minute[s]|min[s]*|hour[s]|hr[s]*/g

			units.forEach(function (unit) {

				if (!is.null(unit) && !unit.match(isValidUnit)) {
					throw "'" + unit + "' is not a valid unit of time."
				}

			})

			return units.filter(is.string)
		}
	}

	const toMilliSeconds = function (quantity, unit) {

		const factors = [
			['second[s]|sec[s]*', 1    * 1000],
			['minute[s]|min[s]*', 60   * 1000],
			['hour[s]|hr[s]*'   , 3600 * 1000]
		]

		const factor =
			factors
			.filter(function (pair) {
				return unit.match(pair[0])
			})
			[0][1]

		return factor * quantity
	}





	return function (times, units) {

		times = validate.times(times)
		units = validate.units(units)

		if (units.length === 1) {
			/*
				Get the time from now to the specified time interval.
			*/

			const time = times[0]
			const unit = units[0]

			const currentTime = (new Date()).getTime()

			console.log(
				new Date(toMilliSeconds(time, unit) + currentTime))

		} else if (units.length === 2) {
			/*
				Get the time between two times
			*/

		} else if (units.length === 3) {
			/*
				Get the time between two times, in a certain unit.
			*/

		}

	}




} )()








tin(
	[args['<first>'], args['<second>']],
	[args['<unit0>'], args['<unit1>'], args['<unit2>']] )
