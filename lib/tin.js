#!/usr/bin/env node

const docopt = require("docopt").docopt
const is     = require('is')

const docs = [
	"Usage:",
	"    tin <first> <unit0>",
	"    tin <first> <unit0> in <unit1>",
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

		const time = times[0]
		const unit = units[0]

		const currentTime = (new Date()).getTime()
		const futureTime  = new Date(toMilliSeconds(time, unit)).getTime()

		console.log(new Date(futureTime + currentTime))

	}

} )()








tin(
	[args['<first>']],
	[args['<unit0>'], args['<unit1>']] )
