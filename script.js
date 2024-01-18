// FAQ section

document.addEventListener("DOMContentLoaded", function () {
  var questions = document.querySelectorAll(".question");

  questions.forEach(function (question) {
    question.addEventListener("click", function () {
      var answer = this.nextElementSibling;
      var caret = this.querySelector(".fa-solid");

      if (answer.style.display === "block") {
        answer.style.display = "none";
        caret.style.transform = "rotate(0deg)";
      } else {
        answer.style.display = "block";
        caret.style.transform = "rotate(90deg)";
      }
    });
  });
});

// Form for questions

function validateAndSubmit() {
  var emailInput = document.querySelector("email");
  var emailValue = emailInput.value;
  var questionInput = document.querySelector("form-question");
  var questionValue = questionInput.value;

  // Simple email pattern check
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailValue)) {
    alert("Please enter a valid email address");
    return;
  }

  if (questionValue.trim() === "") {
    alert("Please enter a question");
    return;
  }

  // Reset error message if validation passes
  errorMessageDiv.textContent = "";

  // If all checks pass, you can submit the form or perform other actions
  // document.querySelector('faq-form').submit(postData(submitQuestionFormUrl, { message: message, email: email, donationPath:donationPath}));
}

// Stripe checkout button

function updateDonationCode() {
  var selectedCurrency = document.querySelector(".currencies").value;
  var donationContainer = document.querySelector(".donation");

  // Clear previous content
  donationContainer.innerHTML = "";

  // Update content based on selected currency
  if (selectedCurrency === "inr") {
    donationContainer.innerHTML = `
          <script async src="https://js.stripe.com/v3/buy-button.js"></script>
          <stripe-buy-button
            buy-button-id="buy_btn_1OZHTmSDKtgEku0ZUJ66SCrJ"
            publishable-key="pk_test_51OZDmXSDKtgEku0ZuVsaNAzK6fH57qVRZjnBqmxf9hycHPSrTkIbMEMz0sVwvi7lr34AkTpwGuIKTZpXQHsXStTv00b0wvEv7k"
          >
          </stripe-buy-button>
        `;
  }
  // Add id and keys for each currency
  else if (selectedCurrency === "usd") {
    donationContainer.innerHTML = `
    <script async src="https://js.stripe.com/v3/buy-button.js"></script>
    <stripe-buy-button
      buy-button-id=""
      publishable-key=""
    >
    </stripe-buy-button>
  `;
  } else if (selectedCurrency === "cad") {
    donationContainer.innerHTML = `
    <script async src="https://js.stripe.com/v3/buy-button.js"></script>
    <stripe-buy-button
      buy-button-id=""
      publishable-key=""
    >
    </stripe-buy-button>
  `;
  } else if (selectedCurrency === "aud") {
    donationContainer.innerHTML = `
    <script async src="https://js.stripe.com/v3/buy-button.js"></script>
    <stripe-buy-button
      buy-button-id=""
      publishable-key=""
    >
    </stripe-buy-button>
  `;
  }
}

// Progress Bar Section update from API End Point

document.addEventListener("DOMContentLoaded", function () {
  fetchData();
  // Set up interval to fetch data every 5 seconds (adjust as needed)
  setInterval(fetchData, 5000);
});

function fetchData() {
  // Replace 'your-api-endpoint' with the actual API endpoint
  fetch("your-api-endpoint")
    .then((response) => response.json())
    .then((data) => {
      updateProgressBar(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function updateProgressBar(data) {
  const totalAmount = data.totalAmount;
  const goalAmount = data.goalAmount;
  const progressPercentage = (totalAmount / goalAmount) * 100;

  // Update HTML elements with the fetched data
  document.querySelector(".progress-bar").style.width =
    progressPercentage + "%";
  document.querySelector(".reached").textContent = "$" + totalAmount;
  document.querySelector(".goal").textContent = "$" + goalAmount;
  document.querySelector(".text-center").innerText =
    progressPercentage.toFixed(2) + " %";
}

// notification -bar

const notificationBar = document.querySelector(".notification-bar");
const shake = document.querySelector(".fa-solid");

notificationBar.addEventListener("mouseover", () => {
  shake.classList.add("fa-shake");
});

notificationBar.addEventListener("mouseout", () => {
  shake.classList.remove("fa-shake");
});

// Recent Donation

document.addEventListener("DOMContentLoaded", function () {
  const notificationBell = document.querySelector(".notification-bar");
  const notificationModal = document.querySelector(".recent-donations");
  let isModalVisible = false;

  notificationBell.addEventListener("click", function (event) {
    event.stopPropagation();
    setInterval(() => {
      fetchRecentDonations();
    }, 5000);

    // Toggle the modal visibility flag
    isModalVisible = !isModalVisible;

    // Set the display property based on the flag
    notificationModal.style.display = isModalVisible ? "block" : "none";
  });

  document.body.addEventListener("click", function (event) {
    if (
      event.target !== notificationModal &&
      !notificationModal.contains(event.target)
    ) {
      // Update the flag and hide the modal
      isModalVisible = false;
      notificationModal.style.display = "none";
    }
  });
});

function fetchRecentDonations() {
  // Replace 'recent-donations-endpoint' with the actual API endpoint
  fetch("recent-donations-endpoint")
    .then((response) => response.json())
    .then((data) => {
      updateRecentDonations(data);
    })
    .catch((error) => console.error("Error fetching recent donations:", error));
}

function updateRecentDonations(data) {
  const recentDonationsList = document.querySelector(".recent-donations");
  // Iterate through recent donations and add them to the list
  data.forEach((donation) => {
    const donationCard = document.createElement("div");
    donationCard.classList.add("donation-card");

    donationCard.innerHTML = `
      <i class="fa-solid fa-user fa-2xl"></i>
      <h3>${donation.userName}</h3>
      <h3>$${donation.amount}</h3>
      <h3>🔥</h3>
    `;

    recentDonationsList.appendChild(donationCard);
  });
}
