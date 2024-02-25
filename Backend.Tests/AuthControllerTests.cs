using Backend.Controllers;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Backend.Services;
using Castle.Core.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Moq.EntityFrameworkCore;

namespace Backend.Tests
{
    [TestClass]
    public class AuthControllerTests
    {
        //разобраться в написании тестов
        [TestMethod]
        public async Task AddUserWithBadModelStateReturnsBadRequest()
        {
            var UserManagerMock = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);

            UserManagerMock.Setup(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);

            var ConfigurationMock = new Mock<Microsoft.Extensions.Configuration.IConfiguration>();

            var controller = new AuthController(UserManagerMock.Object, ConfigurationMock.Object, null);

            controller.ModelState.AddModelError("Username", "Username required");

            var result = await controller.RegisterNewUser(new UserRegistrationDTO());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }
    }
}