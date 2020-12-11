
    // Form
    const form = document.getElementById('my-form');

    // Input fields
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const email = document.getElementById('email');

    // Validation colours
    const green = '#4CAF50';
    const red = '#F44336';

    // Handle form
    form.addEventListener('submit', function(event)
    {
        // Prevent default behaviour
        event.preventDefault();

        if(validateFirstName() && 
           validateLastName() && 
           validatePassword() && 
           validateConfirmPassword() && 
           validateEmail())
        {

            const button = document.getElementById("submit");
            const name = firstName.value;
            const container = document.querySelector('div.container');
            const loader = document.createElement('div');
            const loadingBar = document.createElement('div');

            loadingBar.className = 'indeterminate';

            loader.className = 'progress';
            loader.appendChild(loadingBar);

            container.appendChild(loader);

            button.style.display="none";

            setTimeout(function()
            {
                const loaderDiv = document.querySelector('div.progress');
                const panel = document.createElement('div');
                const text = document.createElement('span');

                text.className = 'white-text';

                panel.className = 'card-panel green';
                text.appendChild(document.createTextNode(`Sign up successful. Welcome to Social Ape ${name}.`));
                panel.appendChild(text);
                container.replaceChild(panel, loaderDiv);

            }, 1000)
        }
    })

    // Validate functions

    function validateFirstName()
    {
        // Check if field is empty
        if(!checkEmpty(firstName))
        {
            return false;
        }

        // Check if field has only letters
        if(!checkLetters(firstName))
        {
            return false;
        }

        return true;
    }

    function validateLastName()
    {
        // Check if field is empty
        if(!checkEmpty(lastName))
        {
            return false;
        }

        // Check if field has only letters
        if(!checkLetters(lastName))
        {
            return false;
        }

        return true;
    }

    function validatePassword()
    {
        // Check if field is empty
        if(!checkEmpty(password))
        {
            return false;
        }

        // Check length
        if(!checkLength(password, 6, 100))
        {
            return false;
        }

        // Strength check
        // 1 - contains letter
        // 2 - contains letter & number
        // 3 - contains lower and upper case letter and number
        // 4 - contains lower and upper case letter and number and special character
        if(!checkStrength(password, 1))
        {
            return false;
        }

        return true;
    }

    function validateConfirmPassword()
    {
        if(password.className !== 'valid')
        {
            setInvalid(confirmPassword, 'Password is invalid');
            return false;
        }

        if(password.value !== confirmPassword.value)
        {
            setInvalid(confirmPassword, 'Passwords do not match');
            return false;
        }

        setValid(confirmPassword);

        return true;
    }

    function validateEmail()
    {
        // Check if field is empty
        if(!checkEmpty(email))
        {
            return false;
        }

        if(!checkStrength(email, 5))
        {
            return false;
        }

        return true;
    }




    // Utility functions

    function checkEmpty(field)
    {
        if(isEmpty(field.value.trim()))
        {
            // Set field invalid
            setInvalid(field, `${field.name} must not be empty`);

            return false;
        }
        else
        {
            // Set field valid
            setValid(field);

            return true;
        }
    }

    function checkLetters(field)
    {
        // Check to see if field value contains only lower/upper case letters
        if(/^[a-zA-Z -]+$/.test(field.value))
        {
            // Set field valid
            setValid(field);

            return true;
        }
        else
        {
            // Set field invalid
            setInvalid(field, `${field.name} may only contain letters, spaces and dashes`);

            return false;
        }
    }

    function isEmpty(value)
    {
        return value === '';
    }

    function setInvalid(field, message)
    {
        field.className = "invalid";
        field.nextElementSibling.innerHTML = message;
        field.nextElementSibling.style.color = red;
    }

    function setValid(field)
    {
        field.className = "valid";
        field.nextElementSibling.innerHTML = '';
        //field.nextElementSibling.style.color = green;
    }

    function checkLength(field, minLen, maxLen)
    {
        if(field.value.length >= minLen && field.value.length <= maxLen)
        {
            setValid(field);
            return true;
        }

        if(field.value.length < minLen)
        {
            setInvalid(field, `${field.name} must be at least ${minLen} characters long`);
            return false;
        }

        if(field.value.length > maxLen)
        {
            setInvalid(field, `${field.name} must be shorter than ${maxLen} characters`);
            return false;
        }
    }

    function checkStrength(field, code)
    {
        let regEx;

        switch(code)
        {
            // At least one letter
            case 1:

                regEx = /(?=.*[a-zA-Z])/;
                return matchRegEx(regEx, field, 'Must contain at least one letter');

            // At least one letter and one number
            case 2:

                regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
                return matchRegEx(regEx, field, 'Must contain at least one letter and one number');

            // At least one uppercase letter, one lowercase letter and one number
            case 3:

                regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
                return matchRegEx(regEx, field, 'Must contain at least one uppercase letter, one lowercase letter and one number');

            // At least one uppercase letter, one lowercase letter, one number and one special character (symbol)
            case 4:

                regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
                return matchRegEx(regEx, field, 'Must contain at least one uppercase letter, one lowercase letter, one number and one special character (symbol)');

            // Email regular expression pattern
            case 5:

                regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return matchRegEx(regEx, field, 'Must be a valid email address');

            default:

                return false;
        }
    }

    function matchRegEx(regEx, field, message)
    {
        if(field.value.match(regEx))
        {
            setValid(field);
            return true;
        }
        else
        {
            setInvalid(field, message);
            return false;
        }
    }


