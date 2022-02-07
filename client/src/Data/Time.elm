module Data.Time exposing (yyyymmdd)

import Time exposing (Month(..), Posix, toDay, toMonth, toYear, utc)


yyyymmdd : Posix -> String
yyyymmdd time =
    let
        year =
            String.fromInt <| toYear utc time

        month =
            case toMonth utc time of
                Jan ->
                    "01"

                Feb ->
                    "02"

                Mar ->
                    "03"

                Apr ->
                    "04"

                May ->
                    "05"

                Jun ->
                    "06"

                Jul ->
                    "07"

                Aug ->
                    "08"

                Sep ->
                    "09"

                Oct ->
                    "10"

                Nov ->
                    "11"

                Dec ->
                    "12"

        dayInt =
            toDay utc time

        day =
            if dayInt >= 10 then
                String.fromInt dayInt

            else
                "0" ++ String.fromInt dayInt
    in
    String.join "-" [ year, month, day ]
