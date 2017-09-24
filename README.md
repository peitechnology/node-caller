# TODO:

- Link medium blog post

## Description:

* NOTE: This program is not perfect. Know that using this program with actual data is intended to actually freeze credit and charges the card entered.

Freezing credit is a good way to protect yourself from identity theft. The process consists of calling three major credit bureaus (TransUnion, Equifax, and Experian), entering information, paying a fee (usually $10), and writing down the security pin used to unfreeze credit at a later date. In actuality, TransUnion and Equifax (pin and confirmation code) are known from the call. However, at the time of publishing, Experian mails the pin needed to unfreeze your account to your address after the call is made.

Twilio's API is used so that we can play back the recordings of the calls afterwards if we need to debug or listen for the unfreeze information manually.

## Background:

Since the recent Equifax security breach it has become evident that people need access to the tools needed to prevent identity theft. Freezing credit is one of those tools. This process can be done over the phone and takes about 30 minutes, ~$30, and some personal information.

## Goal:

To automate the process of freezing credit after the recent Equifax security breach.

## Installation & Use:

Open terminal in the project's folder:

```
npm install
```

Run the project:

```
npm start
```

Open browser to localhost:8080 and fill in the form.

## Help/Comments Needed:

It would be great to get help or comments in the following areas:
- Security
- Pause Method (lacks accuracy because of variable response time, speech recognition is one improvement option)
- Already frozen case

## Call Flow:

The following is the flow for each call to freeze credit at the major institutions. Credit to reddit, as this was originally found on the [Equifax megathread](https://www.reddit.com/r/personalfinance/comments/6yv4gb/official_mega_thread_recent_equifax_security/).

__TransUnion__ 888-909-8872:

```
enter zip code
press 3 to add freeze
enter social security number
enter date-of-birth as 8 digits MMDDYYYY
enter house number from street address then # key
choose a 6 digit security code
press 1 to confirm
credit card number for $10 charge
4 digit expiration date of credit card MMYY
```

__Equifax__ 800-685-1111:

```
press 3 to select freezes
press 1 to continue
say your state then 1 to confirm
enter social security number then 1 to confirm
enter house number from street address then # key, then 1 to confirm
press 1 to select a freeze
there will be a long pause at this point but when the bot comes back it goes very fast.
    Write down the 10-digit pin provided XXXXXXXXXX then later,
    Write down the 10-digit confirmation number provided XXXXXXXXX.
    Press * to repeat both until you have it correct
```

__Experian__ 888-397-3742:

```
press 2 for freeze
press 2 for freeze
press 1 for add freeze
press 2 for no fraud report
enter social security number then # key then 1 to confirm
enter date-of-birth as 8 digits MMDDYYYY then 1 to confirm
enter zip code then # key
enter house number from street address then # key
press 2 for not blind
press 1 to pay by credit card
wait through list of charges by state
select credit card type 1 for mastercard, 2 for visa, 3 for american express, 4 for discover
enter credit card #, then 1 to confirm
4 digit expiration date of credit card then # key MMYY#
```

## TwiML Examples:

__Description__: TwiML are XML files that control the call flow. You can easily host these using [TwiML bins](https://www.twilio.com/console/runtime/twiml-bins). The URL of the bin will be passed into the Twilio client when making calls. Template variables (e.g. {{}}) are filled in by passing their values in the querystring to the bin's URL.

### TransUnion Script:

```
<?xml version="1.0" encoding="UTF-8"?>
<Response>
	<Pause length="25"/>
	<Play digits="{{ZipCode}}"></Play>
	<Pause length="33"/>
	<Play digits="w3"></Play>
	<Pause length="10"/>
	<Play digits="{{SSN}}"></Play>
	<Pause length="10"/>
	<Play digits="{{DOB}}"></Play>
	<Pause length="6"/>
	<Play digits="{{StreetNumber}}"></Play>
	<Pause length="11"/>
	<Play digits="{{SecurityPin}}"></Play>
	<Pause length="7"/>
	<Play digits="1"><Play/>
	<Pause length="28"/>
	<Play digits="{{CcNum}}"></Play>
	<Pause length="4"/>
	<Play digits="{{CcExp}}"></Play>
	<Pause length="20"/>
</Response>
```

### Equifax Script:

```
<?xml version="1.0" encoding="UTF-8"?>
<Response>
	<Pause length="65"/>
	<Play digits="w3"></Play>
	<Pause length="60"/>
	<Play digits="w1"></Play>
	<Pause length="2"/>
	<Say voice="alice">{{State}}.</Say>
	<Pause length="7"/>
	<Play digits="w1"></Play>
	<Pause length="4"/>
	<Play digits="{{SSN}}"></Play>
	<Pause length="11"/>
	<Play digits="w1"></Play>
	<Pause length="30"/>
	<Play digits="{{StreetNumber}}"></Play>
	<Pause length="7"/>
	<Play digits="w1"></Play>
	<Pause length="12"/>
	<Play digits="w1"></Play>
	<Pause length="120"/>
</Response>
```

### Experian Script:

```
<?xml version="1.0" encoding="UTF-8"?>
<Response>
	<Pause length="13"/>
	<Play digits="w2"></Play>
	<Pause length="9"/>
	<Play digits="w2"></Play>
	<Pause length="5"/>
	<Play digits="w1"></Play>
	<Pause length="12"/>
	<Play digits="w2"></Play>
	<Pause length="25"/>
	<Play digits="{{SSN}}"></Play>
	<Pause length="13"/>
	<Play digits="w1"></Play>
	<Pause length="8"/>
	<Play digits="{{DOB}}"></Play>
	<Pause length="15"/>
	<Play digits="w1"></Play>
	<Pause length="4"/>
	<Play digits="{{ZipCode}}"></Play>
	<Pause length="20"/>
	<Play digits="{{StreetNumber}}"></Play>
	<Pause length="12"/>
	<Play digits="w2"></Play>
	<Pause length="11"/>
	<Play digits="w1"></Play>
	<Pause length="93"/>
	<Play digits="{{CardType}}"></Play>
	<Pause length="5"/>
	<Play digits="{{CcNum}}"></Play>
	<Pause length="17"/>
	<Play digits="w1"></Play>
	<Pause length="5"/>
	<Play digits="{{CcExp}}"></Play>
	<Pause length="60"/>
</Response>
```

## Disclaimer:

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
