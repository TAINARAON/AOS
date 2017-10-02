var policyViewer = new function ()
{
	var policies = [];

	(function init(){
		setupAccordionClickHandler();
		getInitialPolicies();
	})();

	function setupAccordionClickHandler()
	{
		$('.toggle').click(function(e) {
		  	e.preventDefault();
		    var $this = $(this);
		  	
		    if ($this.next().hasClass('show')) {
		        $this.next().removeClass('show');
		        //$this.next().slideUp(350);
		    } else {
		        $this.parent().parent().find('li .inner').removeClass('show');
		        //$this.parent().parent().find('li .inner').slideUp(350);
		        $this.next().toggleClass('show');
		        //$this.next().slideToggle(350);
		    }
		});
	}

	function getInitialPolicies()
	{
		debugger;
		policies = policyInvoker.getPolicies();
	}

	function createAccordionPolicyItems()
	{

	}
}