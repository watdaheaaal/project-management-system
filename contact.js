const workDeptSelect = document.getElementById("WorkDept");
        const otherInput = document.getElementById("otherInput");

        workDeptSelect.addEventListener("change", function() {
            if (workDeptSelect.value === "Others") {

                otherInput.style.display = "block";
            } else {

                otherInput.style.display = "none";
            }
        });